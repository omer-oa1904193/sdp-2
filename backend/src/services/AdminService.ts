import {Request, Response} from "express";
import {UserRepo} from "../models/repositories/UserRepo.js";
import {EntityData} from "@mikro-orm/core";
import {User} from "../models/entities/User.js";
import {Course} from "../models/entities/Course.js";
import {Program} from "../models/entities/Program.js";
import {ProgramRepo} from "../models/repositories/ProgramRepo.js";
import {College} from "../models/entities/College.js";
import {Department} from "../models/entities/Department.js";
import {MapCourseProgram} from "../models/entities/MapCourseProgram.js";
import {ElectivePackage} from "../models/entities/ElectivePackage.js";
import {MapElectivePackageProgram} from "../models/entities/MapElectivePackageProgram.js";
import {MapCourseElectivePackage} from "../models/entities/MapCourseElectivePackage.js";

class AdminService {
    async importDataFromSIS(req: Request, res: Response) {

        let users: EntityData<User>[];
        let colleges: EntityData<College>[];
        let departments: EntityData<Department>[];
        let courses: EntityData<Course>[];
        let electivePackages: EntityData<ElectivePackage>[];
        let courseElectivePackageMaps: EntityData<MapCourseElectivePackage>[]
        let programs: EntityData<Program>[];
        let courseProgramMaps: EntityData<MapCourseProgram>[];
        let electiveProgramMaps: EntityData<MapElectivePackageProgram>[];
        try {
            let response = await fetch(`${process.env.SIS_URL}/users/`);
            users = await response.json();

            response = await fetch(`${process.env.SIS_URL}/colleges/`);
            colleges = await response.json();

            response = await fetch(`${process.env.SIS_URL}/departments/`);
            departments = await response.json();

            response = await fetch(`${process.env.SIS_URL}/courses/`);
            courses = await response.json();

            response = await fetch(`${process.env.SIS_URL}/elective-packages/`);
            electivePackages = await response.json();

            response = await fetch(`${process.env.SIS_URL}/courses-elective-packages/`);
            courseElectivePackageMaps = await response.json();

            response = await fetch(`${process.env.SIS_URL}/programs/`);
            programs = await response.json();

            response = await fetch(`${process.env.SIS_URL}/course-programs/`);
            courseProgramMaps = await response.json();

            response = await fetch(`${process.env.SIS_URL}/elective-packages-programs/`);
            electiveProgramMaps = await response.json();


        } catch (e) {
            res.status(500).send("Failed to fetch data from SIS API");
            return;
        }
        //TODO: think about the id sequences that get de-synced when you specify ids in your upsert
        //upsert all courses based on username
        const userRepo = new UserRepo(req.em);
        await userRepo.bulkUpsertUsers(users);
        //upsert all courses based on code, programs based on year and program name
        const programRepo = new ProgramRepo(req.em);
        await programRepo.bulkUpsertColleges(colleges);
        await programRepo.bulkUpsertDepartments(departments);
        await programRepo.bulkUpsertCourses(courses);
        await programRepo.bulkUpsertElectivePackages(electivePackages, courseElectivePackageMaps);
        await programRepo.bulkUpsertPrograms(programs, courseProgramMaps, electiveProgramMaps);

        res.send();
    }
}

export const adminService = new AdminService();