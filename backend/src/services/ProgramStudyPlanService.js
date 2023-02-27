import {programStudyPlanRepo} from "../data/repositories/ProgramStudyPlanRepo.js";

class ProgramStudyPlanService {
    async getColleges(req, res) {
        const colleges = new Set();
        const programs = await programStudyPlanRepo.getProgramStudyPlans()
        programs.forEach(program => colleges.add(program.college))
        res.json(Array.from(colleges))
    }

    async getMajors(req, res) {
        const majors = new Set();
        const programs = await programStudyPlanRepo.getProgramStudyPlans()
        programs.forEach(program => {
            if (!req.query.college || program.college === req.query.college)
                majors.add(program.major)
        })
        res.json(Array.from(majors))
    }

    async getProgramStudyPlans(req, res) {
        const programs = await programStudyPlanRepo.getProgramStudyPlans({
            college: req.query.college,
            major: req.query.major
        })
        res.json(programs)
    }
}

export const programStudyPlanService = new ProgramStudyPlanService();