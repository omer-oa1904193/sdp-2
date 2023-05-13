import {User} from "../entities/User.js";
import {EntityManager} from "@mikro-orm/postgresql";
import {StudyPlan} from "../entities/StudyPlan.js";
import {Program} from "../entities/Program.js";
import {MapCourseStudyPlan} from "../entities/MapCourseStudyPlan.js";
import {MapElectivePackageStudyPlan} from "../entities/MapElectivePackageStudyPlan.js";
import {MapCourseProgram} from "../entities/MapCourseProgram.js";
import {MapElectivePackageProgram} from "../entities/MapElectivePackageProgram.js";
import {Season} from "../enums/Season.js";
import {CourseCategory} from "../enums/CourseCategory.js";
import {wrap} from "@mikro-orm/core";

export class StudyPlanRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getStudyPlans(student: User) {
        return this.em.find(StudyPlan, {author: student.id}, {populate: ["program"]});
    }

    async getStudentStudyPlan(student: User, studyPlanId: number) {
        const studyPlan = await this.em.findOne(StudyPlan, {id: studyPlanId}, {
            orderBy: {courseMappings: {yearOrder: "asc"}, electiveMappings: {yearOrder: "asc"}},
            populate: ["program", "courseMappings", "courseMappings.course",
                "electiveMappings", "electiveMappings.currentCourse", "electiveMappings.electivePackage"]
        });
        if (studyPlan) {
            await this.em.getRepository(StudyPlan).populate(studyPlan, ["courseMappings.course.enrollments", "courseMappings.course.enrollments.grade"],
                {where: {courseMappings: {course: {enrollments: {student: student.id}}}}})
        }
        return studyPlan;
    }

    async addStudentStudyPlan(studyPlanData: { name: string, yearStarted: number, program: Program, author: User }) {
        const newStudyPlan = this.em.create(StudyPlan, {
            name: studyPlanData.name,
            program: studyPlanData.program,
            author: studyPlanData.author.id,
            yearStarted: studyPlanData.yearStarted
        })
        await this.em.flush();

        const courseMappings = await this.em.find(MapCourseProgram, {program: studyPlanData.program});
        const electiveMappings = await this.em.find(MapElectivePackageProgram, {program: studyPlanData.program});
        if (courseMappings.length > 0)
            await this.em.insertMany(MapCourseStudyPlan, courseMappings.map(m => ({
                course: m.course,
                studyPlan: newStudyPlan,
                season: m.season,
                yearOrder: m.yearOrder,
                category: m.category,
            })));
        if (electiveMappings.length > 0)
            await this.em.insertMany(MapElectivePackageStudyPlan, electiveMappings.map(m => ({
                electivePackage: m.electivePackage,
                studyPlan: newStudyPlan,
                season: m.season,
                yearOrder: m.yearOrder,
            })));

        return newStudyPlan;
    }

    async updateStudentStudyPlan(studyPlanId: number, updatedFields: {
        name?: string,
        courseMappings?: { course: number, season: Season, yearOrder: number }[],
        electivePackageMappings?: { id: number, season: Season, yearOrder: number, currentCourse?: number }[]
    }) {
        const studyPlan = await this.em.findOneOrFail(StudyPlan, {id: studyPlanId});
        if (updatedFields.name !== undefined)
            studyPlan.name = updatedFields.name;
        await this.em.flush();

        if (updatedFields.courseMappings !== undefined) {
            await this.em.nativeDelete(MapCourseStudyPlan, {
                course: {$nin: updatedFields.courseMappings.map(c => c.course),},
                studyPlan: studyPlan,
                category: CourseCategory.OTHER,
            })
            const qb = this.em.createQueryBuilder(MapCourseStudyPlan, 'mcsp');

            await qb.insert(updatedFields.courseMappings.map(m => ({
                course: m.course,
                studyPlan: studyPlan,
                season: m.season,
                yearOrder: m.yearOrder,
                category: CourseCategory.OTHER
            }))).onConflict(["study_plan_id", "course_id"])
                .merge({
                    season: qb.raw('excluded.season'),
                    yearOrder: qb.raw('excluded.year_order'),
                }).execute();
        }


        if (updatedFields.electivePackageMappings !== undefined) {
            const idToUpdatedData = updatedFields.electivePackageMappings.reduce((obj: {
                [key: string]: { id: number, season: Season, yearOrder: number, currentCourse?: number };
            }, item) => {
                obj[item.id] = item;
                return obj;
            }, {});
            const mappings = await this.em.find(MapElectivePackageStudyPlan, {id: {$in: updatedFields.electivePackageMappings.map(m => m.id)}})
            mappings.forEach(m => {
                wrap(m).assign({
                    season: idToUpdatedData[m.id].season,
                    yearOrder: idToUpdatedData[m.id].yearOrder,
                    currentCourse: idToUpdatedData[m.id].currentCourse ?? null
                });
            })
            await this.em.persist(mappings)
            await this.em.flush()
        }
        return studyPlan;
    }
}