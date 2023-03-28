import {Request, Response} from "express";
import {UserRepo} from "../models/repositories/UserRepo.js";
import {EntityData} from "@mikro-orm/core";
import {User} from "../models/entities/User.js";
import {Course} from "../models/entities/Course.js";
import {Program} from "../models/entities/Program.js";
import {ProgramRepo} from "../models/repositories/ProgramRepo.js";

class AdminService {
    async importDataFromSIS(req: Request, res: Response) {

        let users: EntityData<User>[];
        let courses: EntityData<Course>[];
        let programs: EntityData<Program>[];
        try {
            let response = await fetch(`${process.env.SIS_URL}/users/`);
            users = await response.json();
            response = await fetch(`${process.env.SIS_URL}/courses/`);
            courses = await response.json();
            response = await fetch(`${process.env.SIS_URL}/programs/`);
            programs = await response.json();
        } catch (e) {
            res.status(500).send("Failed to fetch data from SIS API");
            return;
        }
        const userRepo = new UserRepo(req.em);
        //upsert all courses based on username
        await userRepo.bulkUpsertUsers(users);
        const programRepo = new ProgramRepo(req.em);
        //upsert all courses based on code
        await programRepo.bulkUpsertCourses(courses);
        //upsert all programs based on year and program name
        await programRepo.bulkUpsertPrograms(programs);

        res.send();
    }
}

export const adminService = new AdminService();