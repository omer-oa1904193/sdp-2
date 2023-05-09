import {compareMappings, getEarliestMapping} from "@/utils.js";
import {create} from "zustand";
import graphology from "graphology";

export const useStudyPlanStore = create(() => ({

    createGraph(studyPlan) {
        const prerequisiteGraph = new graphology.Graph();
        const courseIdToMappingId = {};
        for (const courseMapping of studyPlan.courseMappings) {
            prerequisiteGraph.addNode(`course-${courseMapping.id}`);
            courseIdToMappingId[courseMapping.course.id] = courseMapping.id;
        }

        for (const courseMapping of studyPlan.courseMappings) {
            const prerequisites = courseMapping.course.prerequisites;
            const simplifiedPrerequisites = this.simplifyPrerequisites(prerequisites, courseIdToMappingId);
            if (simplifiedPrerequisites !== null) {
                const edges = this.calculatePrereqEdges(simplifiedPrerequisites, courseMapping.course.id, courseIdToMappingId);
                for (const edge of edges)
                    prerequisiteGraph.addDirectedEdge(
                        `course-${courseIdToMappingId[edge[0]]}`,
                        `course-${courseIdToMappingId[edge[1]]}`, {weight: 1});
            }
        }

        return prerequisiteGraph;
    },

    calculatePrereqEdges(expression, toCourseId, courseMappingsByCourseId, edges = []) {
        if ("course" in expression)
            return [...edges, [expression["course"]["id"], toCourseId]];
        else if ("and" in expression) {
            const subEdges = [];
            for (let subexpression of expression["and"])
                subEdges.push(...this.calculatePrereqEdges(subexpression, toCourseId, courseMappingsByCourseId, edges));
            return [...edges, ...subEdges];
        } else if ("or" in expression) {
            let latestMember = null;
            let latestGroup = null;
            for (let subexpression of expression["or"]) {
                let subEdgeGroup = this.calculatePrereqEdges(subexpression, toCourseId, courseMappingsByCourseId, edges);
                let earliestInGroup = getEarliestMapping(subEdgeGroup.map(se => courseMappingsByCourseId[se[0]]));
                if (latestMember === null || compareMappings(earliestInGroup, latestMember) > 0) {
                    latestMember = earliestInGroup;
                    latestGroup = subEdgeGroup;
                }
            }
            return [...edges, ...latestGroup];
        }
        return edges;
    },
    simplifyPrerequisites(expression, idToCourse) {
        if ("course" in expression) {
            if (!(expression["course"]["id"] in idToCourse))
                return null;
            return expression;
        } else if ("test" in expression) {
            return null;
        } else if ("and" in expression || "or" in expression) {
            const operator = "and" in expression ? "and" : "or";
            const simplifiedTerms = expression[operator].map(term => this.simplifyPrerequisites(term, idToCourse)).filter(term => term != null);
            if (simplifiedTerms.length === 0)
                return null;
            if (simplifiedTerms.length === 1)
                return simplifiedTerms[0];
            return {[operator]: simplifiedTerms};
        }
        return null;
    },


}))