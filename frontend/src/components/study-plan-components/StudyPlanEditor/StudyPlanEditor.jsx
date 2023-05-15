import {MESSAGE_TYPES} from "@/components/common/ui/BottomMessage/BottomMessage.jsx";
import {ProgressBar} from "@/components/common/ui/ProgressBar/ProgressBar.jsx";
import {StudyPlanCardList} from "@/components/study-plan-components/StudyPlanCardList/StudyPlanCardList.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {compareSemesters} from "@/utils.js";
import React, {useRef, useState} from "react";
import styles from "./StudyPlanEditor.module.css"

export function StudyPlanEditor({
                                    studyPlan,
                                    setStudyPlan,
                                    isEditable,
                                    setDirty,
                                    currentSemester,
                                    showMessage,
                                    onCourseClicked,
                                    onElectiveClicked
                                }) {
    const userStore = useUserStore();

    async function saveStudyPlan() {
        const courseMappings = []
        const electivePackageMappings = [];


        for (let s of studyPlan.yearMap.values()) {
            for (let m of s.values()) {
                if (m.isElective) {
                    electivePackageMappings.push({
                        id: m.id,
                        season: m.season,
                        year: m.year,
                        currentCourse: m.currentCourse?.id
                    })
                } else
                    courseMappings.push({
                        course: m.course.id,
                        season: m.season,
                        year: m.year,
                    })
            }
        }

        userStore.fetchProtected(`/study-plans/${studyPlan.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: studyPlan.name,
                courseMappings: courseMappings,
                electivePackageMappings: electivePackageMappings,
            }),
        }).then(() => {
            showMessage({text: "Saved.", type: MESSAGE_TYPES.OK});
            setDirty(false)
        })
    }


    function onCardDropped(event, toSemester) {
        const mappingId = Number(event.dataTransfer.getData("mappingId"));
        const fromSemester = event.dataTransfer.getData("fromSemester");
        const isElective = event.dataTransfer.getData("isElective").toLowerCase() === "true";

        const courseListElement = event.target.closest(`.${styles.courseList}`);
        if (!courseListElement)
            return
        courseListElement.classList.remove(styles.courseDropzone)
        const mappingType = isElective ? "elective" : "course";
        const mapping = studyPlan.yearMap.get(fromSemester).get(`${mappingType}-${mappingId}`);
        console.log(`${mappingType} (id: ${mappingId}) was dropped from ${fromSemester} to ${toSemester}`);


        if (fromSemester === toSemester)
            return;
        if (compareSemesters(toSemester, currentSemester) < 0) {
            showMessage({text: "Cannot drag to completed semester", type: MESSAGE_TYPES.ERROR})
            return;
        }
        const updatedSemesters = new Map(studyPlan.yearMap)
        updatedSemesters.get(toSemester).set(`${mappingType}-${mappingId}`, mapping);
        updatedSemesters.get(fromSemester).delete(`${mappingType}-${mappingId}`);
        [mapping.season, mapping.year] = toSemester.split(" ");
        mapping.year = Number(mapping.year);

        //check prerequisites are valid for every course in the plan
        const coursesBefore = [];
        for (const semester of updatedSemesters.values()) {
            const coursesSameSemester = Array.from(semester.values()).filter(m => !m.isElective).map(m => m.course.id);
            for (const m of semester.values()) {
                if (!m.isElective) {
                    const isValid = checkPrerequisites(m.course.prerequisites, coursesBefore, coursesSameSemester, userStore.user.admissionTestResults);
                    if (!isValid) {
                        showMessage({
                            text: `${m.course.code} prerequisite not met in ${toSemester}`,
                            type: MESSAGE_TYPES.ERROR
                        })
                        //undo
                        updatedSemesters.get(fromSemester).set(`${mappingType}-${mappingId}`, mapping);
                        updatedSemesters.get(toSemester).delete(`${mappingType}-${mappingId}`);
                        [mapping.season, mapping.year] = fromSemester.split(" ");
                        mapping.year = Number(mapping.year);
                        return;
                    }
                }
            }
            coursesBefore.push(...coursesSameSemester)
        }

        setStudyPlan({...studyPlan, yearMap: updatedSemesters})
        setDirty(true);
    }


    return <div className={`${styles.spEditor} styled-scrollbars`}>
        {isEditable ?
            <>
                <form className={styles.topDiv} onSubmit={e => e.preventDefault()}>
                    <div>
                        <h2 className={styles.majorTitle}>{studyPlan.program.major}</h2>

                        <input required className={styles.planTitle} type="text" value={studyPlan.name}
                               onChange={(e) => setStudyPlan({...studyPlan, name: e.target.value})}/>
                    </div>
                    <button className={`filled-button ${styles.saveButton}`} onClick={saveStudyPlan}>Save</button>
                </form>
            </>
            :
            <>
                <div className={styles.topDiv}>
                    <h2>Your Progress %</h2>
                    <h2>{studyPlan.program.name}</h2>
                </div>
                <div className={styles.progressDiv}>
                    <p>Enrollment</p>
                    <ProgressBar progress={studyPlan.stats.progress}/>
                    <p>Graduation</p>
                </div>
            </>
        }

        <div className={styles.mainPlan}>
            {Array.from(studyPlan.yearMap).map(([semesterLabel, semesterCourses]) =>
                <div key={semesterLabel} className={styles.semesterDiv}>
                    <h3 className={styles.semesterButton}>{semesterLabel} ({Array.from(semesterCourses.values()).reduce((t, c) => t + c.offering.creditHours, 0)})</h3>
                    <ul className={styles.courseList}
                        onDragOver={(e) => {
                            e.preventDefault()
                            document.querySelectorAll(`.${styles.courseDropzone}`).forEach(e => e.classList.remove(styles.courseDropzone))
                            e.target.closest(`.${styles.courseList}`).classList.add(styles.courseDropzone)
                        }}
                        onDrop={(e) => {
                            onCardDropped(e, semesterLabel)
                        }}>
                        <StudyPlanCardList mappings={semesterCourses}
                                           semester={semesterLabel}
                                           isEditable={isEditable}
                                           onCourseClicked={onCourseClicked}
                                           onElectiveClicked={onElectiveClicked}
                                           setDirty={setDirty}
                                           currentSemester={currentSemester}
                                           onDragEnd={() => document.querySelectorAll(`.${styles.courseDropzone}`).forEach(e => e.classList.remove(styles.courseDropzone))}
                        />
                    </ul>
                    {/*{isEditable &&*/}
                    {/*    <button className="add-course-button inv-button">*/}
                    {/*        <FontAwesomeIcon icon={faPlus}/>*/}
                    {/*    </button>*/}
                    {/*}*/}
                </div>
            )}
        </div>
    </div>
}

function checkPrerequisites(expression, previousCourses, currentCourses, admissionTestResults) {
    if ("and" in expression)
        return expression["and"].every(subexpression => checkPrerequisites(subexpression, previousCourses, currentCourses, admissionTestResults));
    else if ("or" in expression)
        return expression["or"].some(subexpression => checkPrerequisites(subexpression, previousCourses, currentCourses, admissionTestResults));
    else if ("course" in expression) {
        return previousCourses.includes(expression.course.id) || (expression.course.allowConcurrent && currentCourses.includes(expression.course.id));
    } else if ("test" in expression) {
        return admissionTestResults.some(t => expression.test.id === t.admissionTest && t.score >= expression.test.minScore);
    } else {
        return false;
    }
}