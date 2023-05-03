import {authMiddleware} from "./middleware/authMiddleware.js";
import UserService from "./services/UserService.js";
import {adminService} from "./services/AdminService.js";
import {studyPlanService} from "./services/StudyPlanService.js";
import Router from "express-promise-router";
import {ZodError} from "zod";
import {NextFunction, Response} from "express";
import {programService} from "./services/ProgramService.js";

export const router = Router();

router.post("/sessions/", UserService.login);
router.get("/users/me/", authMiddleware, UserService.getUser);

router.get("/study-plans/", authMiddleware,  studyPlanService.getStudyPlans);
router.post("/study-plans/", authMiddleware, studyPlanService.addStudyPlan);
router.get("/study-plans/:studyPlanId/", authMiddleware, studyPlanService.getStudyPlan);
// router.patch("/student-study-plans/:studyPlanId/", authMiddleware, /*uploadMiddleWare.single("image"),*/ studentStudyPlanService.updateStudentStudyPlan);
router.get("/colleges/", programService.getColleges);
router.get("/programs/", programService.getProgramStudyPlans);
router.get("/elective-packages/:packageId", authMiddleware,  programService.getElectivePackage);
router.post("/sync-data/", adminService.importDataFromSIS)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).send(err);
        return;
    }
    console.error(err);
    res.status(500).send();
});