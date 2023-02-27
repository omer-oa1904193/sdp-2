import {studentStudyPlanRepo} from "../data/repositories/StudentStudyPlanRepo.js";

class StudentStudyPlanService {
    async getStudentStudyPlans(req, res) {
        const studyPlans = await studentStudyPlanRepo.getStudentStudyPlans(req.user.id)
        res.json(studyPlans);
    }

    async addStudentStudyPlan(req, res) {
        const newStudyPlan = await studentStudyPlanRepo.addStudentStudyPlan(req.body.name, req.user.id, req.body.program);
        res.json(newStudyPlan);
    }

    async getStudentStudyPlan(req, res) {
        const studyPlan = await studentStudyPlanRepo.getStudentStudyPlan(req.user.id, req.params.studyPlanId)
        res.json(studyPlan);
    }

    async updateStudentStudyPlan(req, res) {
        req.body = JSON.parse(req.body.data)
        if (req.file) {
            fs.writeFileSync(`public/images/study-plans/${req.params.studyPlanId}.png`, req.file.buffer);
        }
        const studyPlan = await studentStudyPlanRepo.updateStudentStudyPlan(req.params.studyPlanId, req.body)
        res.json(studyPlan);
    }
}

export const studentStudyPlanService = new StudentStudyPlanService();