import express from "express";
import {authMiddleware} from "./middleware/authMiddleware.js";
import {programStudyPlanService} from "./services/ProgramStudyPlanService.js";
import {studentStudyPlanService} from "./services/StudentStudyPlanService.js";
import UserService from "./services/UserService.js";

export const router = express.Router();

router.post("/sessions/", UserService.login);
router.get("/users/me/", authMiddleware, UserService.getUser);
router.get("/student-study-plans/", authMiddleware, studentStudyPlanService.getStudentStudyPlans);
router.post("/student-study-plans/", authMiddleware, studentStudyPlanService.addStudentStudyPlan);
router.get("/student-study-plans/:studyPlanId/", authMiddleware, studentStudyPlanService.getStudentStudyPlan);
router.patch("/student-study-plans/:studyPlanId/", authMiddleware, /*uploadMiddleWare.single("image"),*/ studentStudyPlanService.updateStudentStudyPlan);

router.get("/colleges/", programStudyPlanService.getColleges);
router.get("/majors/", programStudyPlanService.getMajors);
router.get("/program-study-plans/", programStudyPlanService.getProgramStudyPlans);


