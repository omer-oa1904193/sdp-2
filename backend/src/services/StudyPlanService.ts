import {StudyPlanRepo} from "../models/repositories/StudyPlanRepo.js";
import {Request, Response} from "express";
import {z} from "zod";
import {ProgramRepo} from "../models/repositories/ProgramRepo.js";
import {Season} from "../models/enums/Season.js";
import {UserRepo} from "../models/repositories/UserRepo.js";
import {resolve} from "dns";

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

    async shareStudyPlan(req: Request, res: Response) {
        const bodyValidator = z.object({
            studyPlan: z.number().min(0),
            userSharedWith: z.number().min(0),
        });
        const body = bodyValidator.parse(req.body);

        const studyPlanRepo = new StudyPlanRepo(req.em)
        const studyPlan = await studyPlanRepo.findStudyPlan(body.studyPlan);
        const userRepo = new UserRepo(req.em)
        const userSharedWith = await userRepo.findUser(body.userSharedWith);
        if (!studyPlan || !userSharedWith) {
            res.status(404).send();
            return;
        }
        const existingSharedStudyPlanMapping = await studyPlanRepo.getUserSharedStudyPlanMapping(studyPlan, userSharedWith);
        if (existingSharedStudyPlanMapping != null) {
            //ignore duplicates
            res.status(200).send(existingSharedStudyPlanMapping);
            return;
        }
        const newSharedStudyPlanMapping = await studyPlanRepo.shareStudyPlan({
            studyPlan: studyPlan,
            userSharedWith: userSharedWith
        })
        res.status(201).json(newSharedStudyPlanMapping);
    }

    async getStudyPlan(req: Request, res: Response) {
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlan = await studyPlanRepo.getStudyPlan(req.user!, pathParams.studyPlanId);
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

    async getStudyPlanComments(req: Request, res: Response) {
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const studyPlanRepo = new StudyPlanRepo(req.em)
        const studyPlan = await studyPlanRepo.findStudyPlan(pathParams.studyPlanId, [""]);
        if (!studyPlan) {
            res.status(404).send();
            return
        }

        if (studyPlan.author.id !== req.user!.id) {
            const sharedStudyPlanMapping = await studyPlanRepo.getUserSharedStudyPlanMapping(studyPlan, req.user!);
            if (sharedStudyPlanMapping == null) {
                //hide private study plans
                res.status(404).send();
                return
            }
        }
        const comments = await studyPlanRepo.getStudyPlanComments(studyPlan);
        res.json(comments);
    }

    async addCommentToStudyPlan(req: Request, res: Response) {
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const studyPlanRepo = new StudyPlanRepo(req.em)
        const studyPlan = await studyPlanRepo.findStudyPlan(pathParams.studyPlanId, [""]);
        if (!studyPlan) {
            res.status(404).send();
            return
        }

        if (studyPlan.author.id !== req.user!.id) {
            const sharedStudyPlanMapping = await studyPlanRepo.getUserSharedStudyPlanMapping(studyPlan, req.user!);
            if (sharedStudyPlanMapping == null) {
                //hide private study plans
                res.status(404).send();
                return
            }
        }

        const bodyValidator = z.object({
            text: z.string().min(1).max(50000)
        })
        const body = bodyValidator.parse(req.body)
        const comments = await studyPlanRepo.addCommentToStudyPlan(studyPlan, {text: body.text, author: req.user!});
        res.json(comments);
    }

    async deleteStudyPlan(req: Request, res: Response) {
        const pathParamsValidator = z.object({studyPlanId: z.string().regex(/^\d+$/).transform(Number)})
        const pathParams = pathParamsValidator.parse(req.params);

        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlan = await studyPlanRepo.findStudyPlan(pathParams.studyPlanId);
        if (studyPlan == null) {
            res.status(404).send();
            return;
        }
        if (studyPlan.author.id !== req.user!.id) {
            res.status(403).send();
            return;
        }
        await studyPlanRepo.deleteStudyPlan(studyPlan)

        res.status(204).send();
    }

    async getSharedStudyPlans(req: Request, res: Response) {
        const studyPlanRepo = new StudyPlanRepo(req.em);
        const studyPlans = await studyPlanRepo.getSharedStudyPlans(req.user!);
        res.json(studyPlans);
    }
}

export const studyPlanService = new StudyPlanService();