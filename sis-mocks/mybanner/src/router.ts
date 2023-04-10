import express from "express";
import {bannerService} from "./services/BannerService.js";

export const router = express.Router();

router.get("/users/", bannerService.getUsers);
router.get("/colleges/", bannerService.getColleges);
router.get("/departments/", bannerService.getDepartments);
router.get("/courses/", bannerService.getCourses);
router.get("/programs/", bannerService.getPrograms);
router.get("/course-programs/", bannerService.getCourseProgramMaps);