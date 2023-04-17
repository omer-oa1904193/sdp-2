import {User} from "../entities/User.js";
import {EntityManager, Enum, Property, types} from "@mikro-orm/core";
import {StudyPlan} from "../entities/StudyPlan.js";
import {Program} from "../entities/Program.js";
import {MapCourseStudyPlan} from "../entities/MapCourseStudyPlan.js";
import {MapElectivePackageStudyPlan} from "../entities/MapElectivePackageStudyPlan.js";
import {Season} from "../enums/Season.js";
import {MapCourseProgram} from "../entities/MapCourseProgram.js";
import {MapElectivePackageProgram} from "../entities/MapElectivePackageProgram.js";

export class StudyPlanRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getStudentStudyPlans(student: User) {

    }

    async getStudentStudyPlan(student: User, studyPlanId: number) {
        const studyPlan = this.em.findOne(StudyPlan, {id: studyPlanId});
        return studyPlan;
    }

    async addStudentStudyPlan(studyPlanData: { name: string, program: Program, author: User }) {
        const newStudyPlan = this.em.create(StudyPlan, {
            name: studyPlanData.name,
            program: studyPlanData.program,
            author: studyPlanData.author.id,
        })
        await this.em.flush();

        const courseMappings = await this.em.find(MapCourseProgram, {program: studyPlanData.program});
        const electiveMappings = await this.em.find(MapElectivePackageProgram, {program: studyPlanData.program});
        if (courseMappings.length > 0)
            await this.em.insertMany(MapCourseStudyPlan, courseMappings.map(m => ({
                course: m,
                studyPlan: newStudyPlan,
                season: m.season,
                yearOrder: m.yearOrder,
            })));
        if (electiveMappings.length > 0)
            await this.em.insertMany(MapElectivePackageStudyPlan, electiveMappings.map(m => ({
                electivePackage: m,
                studyPlan: newStudyPlan,
                season: m.season,
                yearOrder: m.yearOrder,
            })));

        return newStudyPlan;
    }

    async updateStudentStudyPlan(studyPlanId: number, updatedFields) {
    }
}