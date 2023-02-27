import * as dotenv from "dotenv";
import {seedStudentStudyPlans} from "./StudentStudyPlanSeeder.js";
import {seedUsers} from "./UserSeeder.js";
import {connectDB} from "../mongoose.config.js";
import {seedCourses} from "./CourseSeeder.js";
import {seedPrograms} from "./ProgramSeeder.js";
import {seedPackages} from "./PackageSeeder.js";

//load environment variables from .env
dotenv.config();

async function seed() {
    await connectDB();
    await seedUsers();
    await seedCourses();
    await seedPackages();
    await seedPrograms();
    await seedStudentStudyPlans();
}

seed().then(() => {
    console.log("Done seeding.");
    process.exit();
});