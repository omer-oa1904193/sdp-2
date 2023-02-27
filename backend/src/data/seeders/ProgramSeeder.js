import fs from "fs";
import {PackageProgramStudyPlanMap} from "../entities/PackageProgramStudyPlanMap.js";
import {ProgramStudyPlan} from "../entities/ProgramStudyPlan.js";
import {CourseProgramStudyPlanMap} from "../entities/CourseProgramStudyPlanMap.js";

export async function seedPrograms() {
    process.stdout.write("seeding program study plans...");
    await ProgramStudyPlan.deleteMany({});
    await CourseProgramStudyPlanMap.deleteMany({});
    await PackageProgramStudyPlanMap.deleteMany({});

    const programsJSON = JSON.parse(fs.readFileSync("data/program-study-plans.json", "utf8"));
    for (let programData of programsJSON)
        await ProgramStudyPlan.create(programData);

    const courseProgramMapJSON = JSON.parse(fs.readFileSync("data/course-program-study-plan-maps.json", "utf8"));
    for (let mapData of courseProgramMapJSON)
        await CourseProgramStudyPlanMap.create(mapData);

    const electivesJSON = JSON.parse(fs.readFileSync("data/package-program-study-plan-maps.json", "utf8"));
    for (let mapData of electivesJSON)
        await PackageProgramStudyPlanMap.create(mapData);
    console.log("done");
}
