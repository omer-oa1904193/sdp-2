import React from 'react';
import { Box, Typography } from "@mui/material";
import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

export default function Score({ studyPlan }) {
    let totalCourses = 0;
    let semesterCount = 0;
    let totalCreditHours = 0;
    let courseCodeDifficulty = 0;

    // const g = new dagreD3.graphlib.Graph().setGraph({});
    // g.setDefaultEdgeLabel(() => ({}));
    // g.setDefaultNodeLabel(() => ({}));
    const svg = d3.select("svg");
    const force = d3.forceSimulation();
    const nodes = [];
    const links = [];

    for (let [key, value] of studyPlan.yearMap) {
        for (let [innerKey, innerValue] of value) {
            if (innerValue.size == 0) continue;
            semesterCount++
            for (let [subKey, subValue] of innerValue) {
                totalCourses++
                if (typeof subValue.course !== "undefined") {
                    const courseId = subValue.course.id;
                    // g.setNode(courseId, { label: courseId });
                    nodes.push({ id: courseId });
                    if (subValue.course.prerequisites) {
                        const prerequisites = subValue.course.prerequisites.and;
                        if (typeof prerequisites !== "undefined" && prerequisites.length > 0) {
                            for (let prerequisite of prerequisites) {

                                if (prerequisite.or) continue;
                                const prerequisiteId = prerequisite.course.id;
                                nodes.push({ id: prerequisiteId });
                                links.push({ source: prerequisiteId, target: courseId });
                                // g.setEdge(prerequisiteId, courseId);
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

    force.nodes(nodes);
    force.force("link", d3.forceLink(links).id(d => d.id));

    console.log('graph node length ' + force.nodes().length);
// Create a new D3 selection for the nodes of the graph
const node = svg.selectAll(".node")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", "steelblue");

// Create a new D3 selection for the links of the graph
const link = svg.selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("stroke", "gray");

// Update the position of the nodes and links on each tick of the force layout
force.on("tick", () => {
  node.attr("cx", d => d.x)
      .attr("cy", d => d.y);
  link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
});
    // using dagreD3

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

    // using d3:

    // force.nodes().forEach((node) => {
    //     console.log(`Outgoing edges for node ${node.id}:`);
    //     const outgoingEdges = links.filter((link) => link.source.id === node.id);
    //     outgoingEdges.forEach((edge) => {
    //       console.log(`- Edge from ${edge.source.id} to ${edge.target.id}`);
    //     });
    //   });
    //   force.nodes().forEach((node) => {
    //     console.log(`Incoming edges for node ${node.id}:`);
    //     const incomingEdges = links.filter((link) => link.target.id === node.id);
    //     incomingEdges.forEach((edge) => {
    //       console.log(`- Edge from ${edge.source.id} to ${edge.target.id}`);
    //     });
    //   });
      

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
                <Typography fontWeight="bold" color="#888888" variant="h5">Score</Typography>
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