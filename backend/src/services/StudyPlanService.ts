import {StudyPlanRepo} from "../models/repositories/StudyPlanRepo.js";
import {Request, Response} from "express";
import {z} from "zod";
import {ProgramRepo} from "../models/repositories/ProgramRepo.js";
import {Season} from "../models/enums/Season.js";

class StudyPlanService {
    async getStudyPlans(req: Request, res: Response) {
        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlans = await studyPlanRepo.getStudyPlans(req.user!);
        res.json(studyPlans);
    }

    async addStudyPlan(req: Request, res: Response) {
        const bodyValidator = z.object({
            name: z.string(),
            programId: z.number().min(0),
            seasonStarted: z.nativeEnum(Season),
            yearStarted: z.number().min(0)
        })
        const body = bodyValidator.parse(req.body);

        const programRepo = new ProgramRepo(req.em);
        const program = await programRepo.getProgramStudyPlan(body.programId);
        if (!program) {
            res.status(404).send();
            return;
        }

        const studyPlanRepo = new StudyPlanRepo(req.em);
        const newStudyPlan = await studyPlanRepo.addStudentStudyPlan({
            name: body.name,
            yearStarted: body.yearStarted,
            seasonStarted: body.seasonStarted,
            program: program,
            author: req.user!
        });
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
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const bodyValidator = z.object({
            name: z.string(),
            courseMappings: z.array(z.object({
                course: z.number().min(0),
                season: z.nativeEnum(Season),
                year: z.number().min(1)
            })),
            electivePackageMappings: z.array(z.object({
                id: z.number().min(0),
                season: z.nativeEnum(Season),
                year: z.number().min(1),
                currentCourse: z.number().min(0).optional()
            }))
        })
        const body = bodyValidator.parse(req.body);
        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlan = await studyPlanRepo.updateStudentStudyPlan(pathParams.studyPlanId, body);
        res.json(studyPlan);
    }
}

export const studyPlanService = new StudyPlanService();