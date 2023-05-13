import {Request, Response} from "express";
import fs from "fs-extra";

class BannerService {


    async getUsers(req: Request, res: Response) {
        const users = await fs.readJSON("data/users.json");
        res.json(users);
    }

    async getCourses(req: Request, res: Response) {
        const courses = await fs.readJSON("data/courses.json");
        res.json(courses);
    }

    async getAdmissionTests(req: Request, res: Response) {
        const admissionTests = await fs.readJSON("data/admission-tests.json");
        res.json(admissionTests);
    }

    async getAdmissionTestResults(req: Request, res: Response) {
        const admissionTestResults = await fs.readJSON("data/admission-test-results.json");
        res.json(admissionTestResults);
    }

    async getElectivePackages(req: Request, res: Response) {
        const electives = await fs.readJSON("data/elective-packages.json");
        res.json(electives);
    }

    async getCourseElectivePackageMaps(req: Request, res: Response) {
        const electives = await fs.readJSON("data/map-course-elective-packages.json");
        res.json(electives);
    }

    async getPrograms(req: Request, res: Response) {
        const programs = await fs.readJSON("data/programs.json");
        res.json(programs);
    }

    async getColleges(req: Request, res: Response) {
        const colleges = await fs.readJSON("data/colleges.json");
        res.json(colleges);
    }

    async getDepartments(req: Request, res: Response) {
        const departments = await fs.readJSON("data/departments.json");
        res.json(departments);
    }

    async getCourseProgramMaps(req: Request, res: Response) {
        const mappings = await fs.readJSON("data/map-course-programs.json");
        res.json(mappings);
    }

    async getElectivePackageProgramMaps(req: Request, res: Response) {
        const mappings = await fs.readJSON("data/map-elective-package-programs.json");
        res.json(mappings);
    }

    async getEnrollments(req: Request, res: Response){
        const enrollments = await fs.readJSON("data/enrollments.json");
        res.json(enrollments);
    }

    async getGradeScales(req: Request, res: Response){
        const gradeScales = await fs.readJSON("data/grade-scales.json");
        res.json(gradeScales);
    }
}

export const bannerService = new BannerService();