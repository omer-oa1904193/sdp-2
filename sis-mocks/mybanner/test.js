import fs from "fs";
// Read old-courses.json and new-courses.json files
const oldCourses = JSON.parse(fs.readFileSync("/home/ordem/WebstormProjects/sdp2223-63-m/backend/data/courses.json", "utf-8"));
const newCourses = JSON.parse(fs.readFileSync("data/courses.json", "utf-8"));

// Create a map of old course id to new course id based on the shared course code
const courseIdMap = new Map();
for (const oldCourse of oldCourses) {
    const sharedCourse = newCourses.find(newCourse => newCourse.code === oldCourse.code);
    if (sharedCourse) {
        courseIdMap.set(oldCourse._id, sharedCourse.id);
    }
}

const oldPackages = JSON.parse(fs.readFileSync("/home/ordem/WebstormProjects/sdp2223-63-m/backend/data/packages.json", "utf-8"));
const newPackages = JSON.parse(fs.readFileSync("data/elective-packages.json", "utf-8"));

const packageIdMap = new Map();
for (const oldPackage of oldPackages) {
    const sharedPackage = newPackages.find(newPackage => newPackage.title === oldPackage.name);
    if (sharedPackage) {
        packageIdMap.set(oldPackage._id, sharedPackage.id);
    }
}


const oldCoursePackageMaps = JSON.parse(fs.readFileSync("/home/ordem/WebstormProjects/sdp2223-63-m/backend/data/course-package-maps.json", "utf-8"));
const newCoursePackageMaps = JSON.parse(fs.readFileSync("data/map-course-elective-packages.json", "utf-8"));
const newMappings=[];
for (let oldMapping of oldCoursePackageMaps) {
    const newMapping = newCoursePackageMaps.find(n => n.course === courseIdMap.get(oldMapping.course));
    newMapping.electivePackage = packageIdMap.get(oldMapping.package);
    newMappings.push(newMapping)
}

fs.writeFileSync("updated-etc.json", JSON.stringify(newMappings))