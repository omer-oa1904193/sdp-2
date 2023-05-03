import {ProgramRepo} from "../models/repositories/ProgramRepo.js";
import {Request, Response} from "express";
import {z} from "zod";
import {StudyPlanRepo} from "../models/repositories/StudyPlanRepo.js";

class ProgramService {
    async getColleges(req: Request, res: Response) {
        const programRepo = new ProgramRepo(req.em)
        const colleges = await programRepo.getColleges();
        res.json(colleges);
    }

    async getMajors(req: Request, res: Response) {
        // const majors = new Set();
        // const programs = await programStudyPlanRepo.getProgramStudyPlans();
        // programs.forEach(program => {
        //     if (!req.query.college || program.college === req.query.college)
        //         majors.add(program.major);
        // });
        // res.json(Array.from(majors));
    }

    async getProgramStudyPlans(req: Request, res: Response) {
        const queryParamsValidator = z.object({
            college: z.string().regex(/^\d+$/).transform(Number).optional(),
        });
        const queryParams = queryParamsValidator.parse(req.query)
        const programRepo = new ProgramRepo(req.em)
        const programs = await programRepo.getProgramStudyPlans({
            college: queryParams.college,
        });
        res.json(programs);
    }

    async getElectivePackage(req: Request, res: Response) {
        const pathParamsValidator = z.object({packageId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const programRepo = new ProgramRepo(req.em);
        const electivePackage = await programRepo.getElectivePackage(pathParams.packageId);
        if (!electivePackage) {
            res.status(404).send();
            return;
        }
        res.json(electivePackage);
    }
}

export const programService = new ProgramService();