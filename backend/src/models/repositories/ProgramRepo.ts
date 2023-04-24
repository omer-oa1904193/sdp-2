import {EntityData, EntityManager} from "@mikro-orm/core";
import {Course} from "../entities/Course.js";
import {Program} from "../entities/Program.js";
import {College} from "../entities/College.js";
import {Department} from "../entities/Department.js";
import {MapCourseProgram} from "../entities/MapCourseProgram.js";

export class ProgramRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getProgramStudyPlans(filters = {}) {
    }

    async getProgramStudyPlan(programId: number) {
        return await this.em.findOne(Program, {id: programId}, {populate: ["courses"]});
    }

    async bulkUpsertColleges(collegesData: EntityData<College>[]) {
        await this.em.upsertMany(College, collegesData.map(c => ({
            id: c.id,
            name: c.name
        })));
    }

    async bulkUpsertDepartments(departmentsData: EntityData<Department>[]) {
        await this.em.upsertMany(Department, departmentsData.map(d => ({
            id: d.id,
            name: d.name,
            code: d.code,
            college: d.college
        })));
    }

    async bulkUpsertCourses(courseData: EntityData<Course>[]) {
        await this.em.upsertMany(Course, courseData.map(c => {
            const ret: EntityData<Course> = {
                id: c.id,
                code: c.code,
                title: c.title,
                description: c.description,
                creditHours: c.creditHours,
                cost: c.cost,
                department: c.department,
            };
            if (c.prerequisites !== undefined)
                ret.prerequisites = c.prerequisites
            return ret;
        }));
    }

    async bulkUpsertPrograms(programsData: EntityData<Program>[], courseProgramMaps: EntityData<MapCourseProgram>[]) {
        await this.em.upsertMany(Program, programsData.map(p => ({
            id: p.id,
            name: p.name,
            department: p.department,
            yearCreated: p.yearCreated,
        })));
        await this.em.upsertMany(MapCourseProgram, courseProgramMaps.map(m => ({
            id: m.id,
            course: m.course,
            program: m.program,
            season: m.season,
            yearOrder: m.yearOrder,
            category: m.category,
        })));
    }

}