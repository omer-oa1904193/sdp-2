import {CourseCard} from "@/components/study-plan-components/studyplan/CourseCard/CourseCard.jsx";
import {ElectiveCard} from "@/components/study-plan-components/studyplan/ElectiveCard/ElectiveCard.jsx";
import {compareMappings, compareSemesters} from "@/utils.js";
import React, {useState} from "react";
import styles from "./StudyPlanCardList.module.css"

export function StudyPlanCardList({
                                      year,
                                      season,
                                      currentYear,
                                      currentSeason,
                                      mappings,
                                      isEditable,
                                      columnIndex,
                                      onCourseClicked,
                                      onElectiveClicked
                                  }) {
    const [errorCourseId, setErrorCourseId] = useState(null)
    return <>
        {Array.from(mappings).map(([_, mapping], cardIndex) =>
            <li key={mapping.id}
                data-x={columnIndex}
                data-y={cardIndex}
                draggable={isEditable}
                onDragStart={(e) => {
                    console.log(`${mapping.id} was dragged`)
                    e.dataTransfer.setData("mappingId", mapping.id);
                    e.dataTransfer.setData("fromYear", year);
                    e.dataTransfer.setData("fromSemester", season);
                    e.dataTransfer.setData("isElective", mapping.isElective);
                }}
                className={compareSemesters(season, year, currentSeason, currentYear)}>
                {mapping.isElective ?
                    <ElectiveCard electivePackageMapping={mapping}
                                  onElectiveClicked={() => isEditable ? onElectiveClicked(mapping) : undefined}
                                  onCourseClicked={(course) => onCourseClicked(course)}
                                  errorHighlighted={errorCourseId === mapping.id}
                                  clearErrorHighlighted={() => setErrorCourseId(null)}/> :
                    <CourseCard courseMapping={mapping}
                                onCourseClicked={() => onCourseClicked(mapping.course)}
                                errorHighlighted={errorCourseId === mapping.id}
                                clearErrorHighlighted={() => setErrorCourseId(null)}/>
                }
            </li>
        )}
    </>
}

