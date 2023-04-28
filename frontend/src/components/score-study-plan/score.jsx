import React from 'react';

const Score = ({ studyPlan }) => {     

    let totalCourses = 0;
    let semesterCount = 0;
    let totalCreditHours = 0;
    let courseCodeDifficulty = 0;


    for (let [key, value] of studyPlan.yearMap) {
        for (let [innerKey, innerValue] of value) {

            if (innerValue.size == 0) continue;
            semesterCount++
            for (let [subKey, subValue] of innerValue) {
                totalCourses++

                if (typeof subValue.course !== "undefined") {
                    let courseCode = subValue.course.code;
                    totalCreditHours += subValue.course.creditHours;

                    let numericPart = courseCode.match(/\d+/)[0];
                    let numericCode = parseInt(numericPart);
                    let firstNumber = Math.floor(numericCode / 100);
                    
                    if (firstNumber > subValue.yearOrder) {
                        courseCodeDifficulty++;
                    }
                }
            }
        }
    }

    let averageCoursesPerSemester = totalCourses / semesterCount;
    let averageCreditHourPerSemester = totalCreditHours / semesterCount;
    console.log("Total number of years: " + studyPlan.yearMap.size)
    console.log("Total number of courses: " + totalCourses)
    console.log("Total number of credit hours: " + totalCreditHours)
    console.log("Course code difficulty: " + courseCodeDifficulty)
    console.log("Average courses per semester: " + averageCoursesPerSemester);
    console.log("Average credit hour per semester: " + averageCreditHourPerSemester)

    const ideal = {
        totalYears: 4,
        totalCourses: 45,
        totalCreditHours: 120,
        averageCoursesPerSemester: 5,
        averageCreditHourPerSemester: 12,
        courseCodeDifficulty: totalCourses/2
      };

    const actual = {
        totalYears: studyPlan.yearMap.size,
        totalCourses,
        totalCreditHours,
        averageCoursesPerSemester,
        averageCreditHourPerSemester,
        courseCodeDifficulty,
      };


      const scores = Object.entries(ideal).map(([key, value]) => ({
        key,
        score: (actual[key] / value) * 100,
      }));
      const overallScore = (scores.reduce((acc, { score }) => acc + score, 0) / scores.length).toFixed(1);
      console.log(`Overall score: ${overallScore}`);

    return (
        <div>

        </div>
    );
}

export default Score;
