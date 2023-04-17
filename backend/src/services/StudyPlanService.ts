import {StudyPlanRepo} from "../models/repositories/StudyPlanRepo.js";
import {Request, Response} from "express";
import fs from "fs-extra";
import {z} from "zod";
import {ProgramRepo} from "../models/repositories/ProgramRepo.js";
import {UserRole} from "../models/enums/UserRole.js";

class StudyPlanService {
    async getStudentStudyPlans(req: Request, res: Response) {
        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlans = await studyPlanRepo.getStudentStudyPlans(req.user.id);
        res.json(studyPlans);
    }

    async addStudyPlan(req: Request, res: Response) {
        const bodyValidator = z.object({
            name: z.string(),
            programId: z.number().min(0),
        })
        const body = bodyValidator.parse(req.body);

        const programRepo = new ProgramRepo(req.em);
        const program = await programRepo.getProgramStudyPlan(body.programId);
        if (!program) {
            res.status(404).send();
            return;
        }

        const studyPlanRepo = new StudyPlanRepo(req.em);
        const newStudyPlan = await studyPlanRepo.addStudentStudyPlan({name: body.name, program: program, author: req.user!});
        res.json(newStudyPlan);
    }

    async getStudyPlan(req: Request, res: Response) {
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlan = await studyPlanRepo.getStudentStudyPlan(req.user!, pathParams.studyPlanId);
        if (!studyPlan) {
            res.status(404).send();
            return;
        }
        res.json(studyPlan);
    }

    async updateStudentStudyPlan(req: Request, res: Response) {
        req.body = JSON.parse(req.body.data);
        if (req.file) {
            fs.writeFileSync(`public/images/study-plans/${req.params.studyPlanId}.png`, req.file.buffer);
        }
        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlan = await studyPlanRepo.updateStudentStudyPlan(req.params.studyPlanId, req.body);
        res.json(studyPlan);
    }
}

export const studyPlanService = new StudyPlanService();