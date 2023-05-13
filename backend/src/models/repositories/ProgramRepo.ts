import {EntityData, EntityManager, FindOptions} from "@mikro-orm/core";
import {Course} from "../entities/Course.js";
import {Program} from "../entities/Program.js";
import {College} from "../entities/College.js";
import {Department} from "../entities/Department.js";
import {MapCourseProgram} from "../entities/MapCourseProgram.js";
import {MapElectivePackageProgram} from "../entities/MapElectivePackageProgram.js";
import {ElectivePackage} from "../entities/ElectivePackage.js";
import {MapCourseElectivePackage} from "../entities/MapCourseElectivePackage.js";
import {AdmissionTest} from "../entities/AdmissionTest.js";
import {AdmissionTestResult} from "../entities/AdmissionTestResult.js";
import {FilterQuery} from "@mikro-orm/core/typings.js";
import {GradeScale} from "../entities/GradeScale.js";
import {Enrollment} from "../entities/Enrollment.js";

export class ProgramRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getProgramStudyPlans(filters: { college?: number } = {}) {
        const programFilters: FilterQuery<Program> = {$and: []};
        if (filters.college !== undefined)
            programFilters.$and!.push({department: {college: filters.college}})
        return await this.em.find(Program, programFilters, {});
    }

    async getProgramStudyPlan(programId: number) {
        return await this.em.findOne(Program, {id: programId}, {populate: ["courses"]});
    }


    async getElectivePackage(packageId: number) {
        return await this.em.findOne(ElectivePackage, {id: packageId}, {populate: ["courses"]});
    }

    async getColleges() {
        return await this.em.find(College, {});
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

    async bulkUpsertElectivePackages(electivePackageData: EntityData<ElectivePackage>[], courseElectivePackageMaps: EntityData<MapCourseElectivePackage>[]) {
        await this.em.upsertMany(ElectivePackage, electivePackageData.map(e => ({
            id: e.id,
            title: e.title,
            category: e.category,
            creditHours: e.creditHours
        })));

        await this.em.upsertMany(MapCourseElectivePackage, courseElectivePackageMaps.map(m => ({
            id: m.id,
            course: m.course,
            electivePackage: m.electivePackage
        })));
    }

    async bulkUpsertPrograms(programsData: EntityData<Program>[], courseProgramMaps: EntityData<MapCourseProgram>[], electiveProgramMaps: EntityData<MapElectivePackageProgram>[]) {
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
        await this.em.upsertMany(MapElectivePackageProgram, electiveProgramMaps.map(m => ({
            id: m.id,
            electivePackage: m.electivePackage,
            program: m.program,
            season: m.season,
            yearOrder: m.yearOrder
        })));
    }

    async bulkUpsertAdmissionTests(admissionTests: EntityData<AdmissionTest>[], admissionTestResults: EntityData<AdmissionTestResult>[]) {
        await this.em.upsertMany(AdmissionTest, admissionTests.map(a => ({
            id: a.id,
            name: a.name,
            maxScore: a.maxScore
        })));
        await this.em.upsertMany(AdmissionTestResult, admissionTestResults.map(a => ({
            id: a.id,
            admissionTest: a.admissionTest,
            student: a.student,
            score: a.score
        })));
    }

    async bulkUpsertGradeScales(gradeScales: EntityData<GradeScale>[]) {
        await this.em.upsertMany(GradeScale, gradeScales.map(g => ({
            id: g.id,
            letterGrade: g.letterGrade,
            numericalValue: g.numericalValue
        })));
    }

    async bulkUpsertEnrollments(enrollments: EntityData<Enrollment>[]) {
        await this.em.upsertMany(Enrollment, enrollments.map(e => ({
            id: e.id,
            course: e.course,
            student: e.student,
            season: e.season,
            year: e.year,
            grade: e.grade
        })));
    }
}