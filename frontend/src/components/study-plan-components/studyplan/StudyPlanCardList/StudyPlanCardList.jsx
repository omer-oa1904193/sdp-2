import {CourseCard} from "@/components/study-plan-components/studyplan/CourseCard/CourseCard.jsx";
import {ElectiveCard} from "@/components/study-plan-components/studyplan/ElectiveCard/ElectiveCard.jsx";
import {compareSemesters} from "@/utils.js";
import React, {useState} from "react";
import styles from "./StudyPlanCardList.module.css"

export function StudyPlanCardList({
                                      yearStarted,
                                      yearOrder,
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
    const isCompleted = compareSemesters(season, yearStarted + yearOrder - 1, currentSeason, currentYear) < 0;
    return <div className={`${styles.semesterCourseList} ${isCompleted && styles.completedSemester}`}>
        {Array.from(mappings).map(([_, mapping], cardIndex) =>
            <li key={mapping.id}
                data-x={columnIndex}
                data-y={cardIndex}
                draggable={true}
                onDragStart={(e) => {
                    if (!isEditable || isCompleted) {
                        e.preventDefault();
                        return;
                    }

                    console.log(`${mapping.id} was dragged`)
                    e.dataTransfer.setData("mappingId", mapping.id);
                    e.dataTransfer.setData("fromYear", yearOrder);
                    e.dataTransfer.setData("fromSemester", season);
                    e.dataTransfer.setData("isElective", mapping.isElective);
                }}>
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
    </div>
}

