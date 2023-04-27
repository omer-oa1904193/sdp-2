import {CourseCard} from "@/components/study-plan-components/studyplan/CourseCard/CourseCard.jsx";
import {ElectiveCard} from "@/components/study-plan-components/studyplan/ElectiveCard/ElectiveCard.jsx";
import React, {useState} from "react";

export function StudyPlanCardList({year, semester, mappings, isElectives, isEditable}) {
    const [errorCourseId, setErrorCourseId] = useState(null)
    return <>
        {Array.from(mappings).map(([_, mapping]) =>
            <li key={mapping.id}
                id={`course-li-${mapping.id}`}
                draggable={isEditable}
                onDragStart={(e) => {
                    console.log(`${mapping.id} was dragged`)
                    e.dataTransfer.setData("mappingId", mapping.id);
                    e.dataTransfer.setData("fromYear", year);
                    e.dataTransfer.setData("fromSemester", semester);
                    e.dataTransfer.setData("isElective", isElectives);
                }
                }>
                {isElectives ?
                    <ElectiveCard electivePackageMapping={mapping}
                                  onElectiveClicked={() => isEditable ? onElectiveClicked(mapping) : undefined}
                                  onCourseClicked={(course) => onCourseClicked(course)}
                                  errorHighlighted={errorCourseId === mapping.id}
                                  clearErrorHighlighted={() => setErrorCourseId(null)}/> :
                    <CourseCard courseMapping={mapping}
                                onCourseClicked={() => onCourseClicked(mapping)}
                                errorHighlighted={errorCourseId === mapping.id}
                                clearErrorHighlighted={() => setErrorCourseId(null)}/>
                }
            </li>
        )}
    </>
}

