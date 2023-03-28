import {studentStudyPlanRepo} from "../models/repositories/StudyPlanRepo.js";
import {Request, Response} from "express";
import fs from "fs-extra";

class StudentStudyPlanService {
    async getStudentStudyPlans(req: Request, res: Response) {
        const studyPlans = await studentStudyPlanRepo.getStudentStudyPlans(req.user.id);
        res.json(studyPlans);
    }

    async addStudentStudyPlan(req: Request, res: Response) {
        const newStudyPlan = await studentStudyPlanRepo.addStudentStudyPlan(req.body.name, req.user.id, req.body.program);
        res.json(newStudyPlan);
    }

    async getStudentStudyPlan(req: Request, res: Response) {
        const studyPlan = await studentStudyPlanRepo.getStudentStudyPlan(req.user.id, req.params.studyPlanId);
        res.json(studyPlan);
    }

    async updateStudentStudyPlan(req: Request, res: Response) {
        req.body = JSON.parse(req.body.data);
        if (req.file) {
            fs.writeFileSync(`public/images/study-plans/${req.params.studyPlanId}.png`, req.file.buffer);
        }
        const studyPlan = await studentStudyPlanRepo.updateStudentStudyPlan(req.params.studyPlanId, req.body);
        res.json(studyPlan);
    }
}

export const studentStudyPlanService = new StudentStudyPlanService();