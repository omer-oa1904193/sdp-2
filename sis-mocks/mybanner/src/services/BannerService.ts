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
}

export const bannerService = new BannerService();