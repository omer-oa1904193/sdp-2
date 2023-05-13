import express from "express";
import {bannerService} from "./services/BannerService.js";

export const router = express.Router();

router.get("/users/", bannerService.getUsers);
router.get("/colleges/", bannerService.getColleges);
router.get("/departments/", bannerService.getDepartments);
router.get("/admission-tests/", bannerService.getAdmissionTests);
router.get("/admission-tests-results/", bannerService.getAdmissionTestResults);
router.get("/courses/", bannerService.getCourses);
router.get("/elective-packages/", bannerService.getElectivePackages);
router.get("/programs/", bannerService.getPrograms);
router.get("/course-programs/", bannerService.getCourseProgramMaps);
router.get("/elective-packages-programs/", bannerService.getElectivePackageProgramMaps);
router.get("/courses-elective-packages/", bannerService.getCourseElectivePackageMaps);
router.get("/enrollments/", bannerService.getEnrollments);
router.get("/grade-scales/", bannerService.getGradeScales);
