import fs from "fs";
import {Course} from "../entities/Course.js";
import {CoursePrerequisiteMap} from "../entities/CoursePrerequisiteMap.js";

export async function seedCourses() {
    process.stdout.write("seeding courses...");
    await Course.deleteMany({});
    const coursesJSON = JSON.parse(fs.readFileSync("data/courses.json", "utf8"));
    for (let courseData of coursesJSON)
        await Course.create(courseData);

    await CoursePrerequisiteMap.deleteMany({});
    const coursesPrerequisiteMapJSON = JSON.parse(fs.readFileSync("data/course-prerequisite-maps.json", "utf8"));
    for (let mapData of coursesPrerequisiteMapJSON)
        await CoursePrerequisiteMap.create(mapData);
    console.log("done");
}
