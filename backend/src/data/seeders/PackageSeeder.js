import fs from "fs";
import {Package} from "../entities/Package.js";
import {CoursePackageMap} from "../entities/CoursePackageMap.js";

export async function seedPackages() {
    process.stdout.write("seeding course packages...");
    await Package.deleteMany({});
    await CoursePackageMap.deleteMany({});

    const packageJSON = JSON.parse(fs.readFileSync("data/packages.json", "utf8"));
    for (let packageData of packageJSON)
        await Package.create(packageData);

    const coursePackageMapJSON = JSON.parse(fs.readFileSync("data/course-package-maps.json", "utf8"));
    for (let mapData of coursePackageMapJSON)
        await CoursePackageMap.create(mapData);
    console.log("done");
}
