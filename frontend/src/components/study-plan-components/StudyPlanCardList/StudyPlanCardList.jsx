import {CourseCard} from "@/components/study-plan-components/CourseCard/CourseCard.jsx";
import {ElectiveCard} from "@/components/study-plan-components/ElectiveCard/ElectiveCard.jsx";
import {compareSemesters} from "@/utils.js";
import React, {useState} from "react";
import styles from "./StudyPlanCardList.module.css"

export function StudyPlanCardList({
                                      semester,
                                      currentSemester,
                                      mappings,
                                      isEditable,
                                      columnIndex,
                                      onCourseClicked,
                                      onDragEnd,
                                      onElectiveClicked
                                  }) {

    const [errorCourseId, setErrorCourseId] = useState(null)
    const [season, year] = semester.split(" ");
    const isPastSemester = compareSemesters(semester, currentSemester) < 0;
    return <div className={`${styles.semesterCourseList} ${isPastSemester && styles.completedSemester}`}>
        {Array.from(mappings).map(([_, mapping], cardIndex) =>
            <li key={mapping.id}
                data-x={columnIndex}
                data-y={cardIndex}
                draggable={true}
                onDragStart={(e) => {
                    if (!isEditable || (isPastSemester && mapping.isCompleted)) {
                        e.preventDefault();
                        return;
                    }

                    console.log(`${mapping.id} was dragged`)
                    e.dataTransfer.setData("mappingId", mapping.id);
                    e.dataTransfer.setData("fromSemester", semester);
                    e.dataTransfer.setData("isElective", mapping.isElective);
                }}
                onDragEnd={onDragEnd}>
                {mapping.isElective ?
                    <ElectiveCard electivePackageMapping={mapping}
                                  isPastSemester={isPastSemester}
                                  onElectiveClicked={() => isEditable ? onElectiveClicked(mapping) : undefined}
                                  onCourseClicked={(course) => onCourseClicked(course)}
                                  errorHighlighted={errorCourseId === mapping.id}
                                  clearErrorHighlighted={() => setErrorCourseId(null)}/> :
                    <CourseCard courseMapping={mapping}
                                isPastSemester={isPastSemester}
                                onCourseClicked={() => onCourseClicked(mapping.course)}
                                errorHighlighted={errorCourseId === mapping.id}
                                clearErrorHighlighted={() => setErrorCourseId(null)}/>
                }
            </li>
        )}
    </div>
}

