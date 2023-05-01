import React from 'react';
import { Box, Typography } from "@mui/material";
import * as dagreD3 from "dagre-d3";

export default function Score({ studyPlan }) {
    let totalCourses = 0;
    let semesterCount = 0;
    let totalCreditHours = 0;
    let courseCodeDifficulty = 0;

    const g = new dagreD3.graphlib.Graph().setGraph({});
    g.setDefaultEdgeLabel(() => ({}));
    g.setDefaultNodeLabel(() => ({}));

    for (let [key, value] of studyPlan.yearMap) {
        for (let [innerKey, innerValue] of value) {
            if (innerValue.size == 0) continue;
            semesterCount++
            for (let [subKey, subValue] of innerValue) {
                totalCourses++
                if (typeof subValue.course !== "undefined") {
                    const courseId = subValue.course.id;
                        g.setNode(courseId, { label: courseId });
                    if (subValue.course.prerequisites) {
                        const prerequisites = subValue.course.prerequisites.and;
                        if (typeof prerequisites !== "undefined" && prerequisites.length > 0) {
                            for (let prerequisite of prerequisites) {

                                if (prerequisite.or) continue;
                                const prerequisiteId = prerequisite.course.id;
                                   g.setEdge(prerequisiteId, courseId);
                            }
                        }

                    }
                    ////////////////////////////////
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

    console.log('graph node length ' + g.nodes().length);
    // g.nodes().forEach((node) => {
    //     const label = g.node(node).label;
    //     console.log(`Node ${node} has label ${label}`);
    // });
    // g.nodes().forEach((nodeId) => {
    //     console.log(`Outgoing edges for node ${nodeId}:`);
    //     const outgoingEdges = g.outEdges(nodeId);
    //     outgoingEdges.forEach((edge) => {
    //         console.log(`- Edge from ${edge.v} to ${edge.w}`);
    //     });
    // });
    // g.nodes().forEach((nodeId) => {
    //     console.log(`Incoming edges for node ${nodeId}:`);
    //     const incomingEdges = g.inEdges(nodeId);
    //     incomingEdges.forEach((edge) => {
    //         console.log(`- Edge from ${edge.v} to ${edge.w}`);
    //     });
    // });
      

    let averageCoursesPerSemester = totalCourses / semesterCount;
    let averageCreditHourPerSemester = totalCreditHours / semesterCount;
    // console.log("Total number of years: " + studyPlan.yearMap.size)
    // console.log("Total number of courses: " + totalCourses)
    // console.log("Total number of credit hours: " + totalCreditHours)
    // console.log("Course code difficulty: " + courseCodeDifficulty)
    // console.log("Average courses per semester: " + averageCoursesPerSemester);
    // console.log("Average credit hour per semester: " + averageCreditHourPerSemester)

    const ideal = {
        totalYears: 4,
        totalCourses: 45,
        totalCreditHours: 120,
        averageCoursesPerSemester: 5,
        averageCreditHourPerSemester: 12,
        courseCodeDifficulty: totalCourses / 2
    };

    const actual = {
        totalYears: studyPlan.yearMap.size,
        totalCourses,
        totalCreditHours,
        averageCoursesPerSemester,
        averageCreditHourPerSemester,
        courseCodeDifficulty,
    };

    let overallScore = 0;
    let scores = Object.entries(ideal).map(([key, value]) => ({
        key,
        score: (actual[key] / value) * 100,
    }));
    overallScore = (scores.reduce((acc, { score }) => acc + score, 0) / scores.length).toFixed(1);
    // const overallScore = 71
    console.log(`Overall score: ${overallScore}`);


return (
  <>
    <Box textAlign="center">
      <Typography fontWeight="bold" color="#888888" variant="h5">
        Score
      </Typography>
      <Typography
        fontWeight="bold"
        variant="h5"
        style={{
          color:
            overallScore > 70
              ? "#61C975"
              : overallScore > 50
              ? "#DAAE6B"
              : "#C96161",
        }}
      >
        {overallScore}
      </Typography>
    </Box>
  </>
);
    }