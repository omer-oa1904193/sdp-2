import fs from "fs";
import {CourseStudentStudyPlanMap} from "../entities/CourseStudentStudyPlanMap.js";
import {PackageStudentStudyPlanMap} from "../entities/PackageStudentStudyPlanMap.js";
import {StudentStudyPlan} from "../entities/StudentStudyPlan.js";

export async function seedStudentStudyPlans() {
    process.stdout.write("seeding student study plans...");
    await StudentStudyPlan.deleteMany({});
    await CourseStudentStudyPlanMap.deleteMany({});
    await PackageStudentStudyPlanMap.deleteMany({});

    const studentStudyPlanJSON = JSON.parse(fs.readFileSync("data/student-study-plans.json", "utf8"));
    for (let studentStudyPlanData of studentStudyPlanJSON)
        await StudentStudyPlan.create(studentStudyPlanData);

    const courseStudyPlanMapJSON = JSON.parse(fs.readFileSync("data/course-student-study-plan-maps.json", "utf8"));
    for (let mapData of courseStudyPlanMapJSON)
        await CourseStudentStudyPlanMap.create(mapData);

    const electivesJSON = JSON.parse(fs.readFileSync("data/package-student-study-plan-maps.json", "utf8"));
    for (let mapData of electivesJSON)
        await PackageStudentStudyPlanMap.create(mapData);
    console.log("done");
}
