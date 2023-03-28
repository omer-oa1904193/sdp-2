import {EntityData, EntityManager} from "@mikro-orm/core";
import {Course} from "../entities/Course.js";
import {Program} from "../entities/Program.js";

export class ProgramRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getProgramStudyPlans(filters = {}) {
    }

    async bulkUpsertCourses(courses: EntityData<Course>[]) {
        console.log(courses)
    }

    async bulkUpsertPrograms(programs: EntityData<Program>[]) {
        console.log(programs)
    }
}