import {ProgressBar} from "@/components/common/ui/ProgressBar/ProgressBar.jsx";
import {StudyPlanCardList} from "@/components/study-plan-components/studyplan/StudyPlanCardList/StudyPlanCardList.jsx";
import {useUserStore} from "@/stores/userStore.js";
import React, {useRef, useState} from "react";
import styles from "./StudyPlanEditor.module.css"

export function StudyPlanEditor({studyPlan, setStudyPlan, isEditable, setDirty, onCourseClicked, onElectiveClicked}) {
    const [errorCourseId, setErrorCourseId] = useState(null)
    const studyPlanEditor = useRef(null);
    const user = useUserStore(store => store.user);

    async function saveStudyPlan() {
        // const allCourses = [];
        // studyPlan.years.forEach(y => allCourses.push(...Object.values(y).map(c => Object.values(c)).flat(1)));
        // const courses = allCourses.filter(c => !c.isElective)
        //     .map(c => ({id: c.id, semester: c.semester, year: c.year}));
        // const packages = allCourses.filter(c => c.isElective)
        //     .map(c => ({id: c.id, semester: c.semester, year: c.year, currentCourse: c.currentCourse?.id}));
        //
        //
        // const formData = new FormData()
        // if (studyPlanScreenshot)
        //     formData.append("image", await canvas2Blob(studyPlanScreenshot), `${studyPlan.id}.png`)
        // formData.append("data", JSON.stringify({
        //     name: studyPlan.name,
        //     courses: courses,
        //     packages: packages,
        // }));
        // userContext.fetchProtected(`${API_URL}/student-study-plans/${studyPlan.id}`, {
        //     method: "PATCH",
        //     body: formData,
        //     headers: {}
        // }).then(() => setDirty(false))
    }

    function onCardDropped(event, toYear, toSemester) {
        const mappingId = Number(event.dataTransfer.getData("mappingId"));
        const fromYear = Number(event.dataTransfer.getData("fromYear"));
        const fromSemester = event.dataTransfer.getData("fromSemester");
        const isElective = event.dataTransfer.getData("isElective").toLowerCase() === "true";

        const courseListElement = event.target.closest(`.${styles.courseList}`);
        if (!courseListElement)
            return
        courseListElement.classList.remove(styles.courseDropzone)
        const mappingType = isElective ? "elective" : "course";
        const mapping = studyPlan.yearMap.get(fromYear).get(fromSemester).get(`${mappingType}-${mappingId}`);
        console.log(`${mappingType} (id: ${mappingId}) was dropped from ${fromSemester} ${fromYear} to ${toSemester} ${toYear}`);

        if (fromSemester === toSemester && fromYear === toYear)
            return;
        const updatedYearMap = new Map(studyPlan.yearMap)
        updatedYearMap.get(toYear).get(toSemester).set(`${mappingType}-${mappingId}`, mapping);
        updatedYearMap.get(fromYear).get(fromSemester).delete(`${mappingType}-${mappingId}`);
        mapping.season = toSemester;
        mapping.yearOrder = toYear;

        //check prerequisites are valid for every course in the plan
        const coursesBefore = [];
        for (const s of updatedYearMap.values()) {
            for (const ms of s.values()) {
                const coursesSameSemester = Array.from(ms.values()).filter(m => !m.isElective).map(m => m.course.id);
                for (const m of ms.values()) {
                    if (!m.isElective) {
                        const isValid = checkPrerequisites(m.course.prerequisites, coursesBefore, coursesSameSemester, user.admissionTestResults);
                        if (!isValid) {
                            console.log(`${m.course.code} has prerequisite conditions that are not fulfilled`)
                            //undo
                            updatedYearMap.get(fromYear).get(fromSemester).set(`${mappingType}-${mappingId}`, mapping);
                            updatedYearMap.get(toYear).get(toSemester).delete(`${mappingType}-${mappingId}`);
                            mapping.season = fromSemester;
                            mapping.yearOrder = fromYear;
                            return;
                        }
                    }
                }
                coursesBefore.push(...coursesSameSemester)
            }
        }

        setStudyPlan({...studyPlan, yearMap: updatedYearMap})
        // setDirty(true);
    }


    return <div className={`${styles.spEditor} styled-scrollbars`}>
        {isEditable ?
            <>
                <div className={styles.topDiv}>
                    <div>
                        <h2 className={styles.majorTitle}>{studyPlan.program.major}</h2>
                        <h4 className={styles.planTitle}>{studyPlan.name}</h4>
                    </div>
                    <button className={`main-button ${styles.saveButton}`} onClick={saveStudyPlan}>Save</button>
                </div>
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

        <div className={styles.mainPlan} ref={studyPlanEditor}>
            {Array.from(studyPlan.yearMap).map(([yearOrder, semesterMap]) =>
                <div key={yearOrder} className={styles.yearDiv}>
                    <button className={styles.yearButton}>Year {yearOrder}</button>
                    <div className={styles.yearSemesters}>
                        {Array.from(semesterMap).filter(([_, mappings]) => mappings.size !== 0).map(([semesterLabel, mappings]) => {
                            return <div key={semesterLabel} className={styles.semesterDiv}>
                                <h3 className={styles.semesterButton}>{semesterLabel}</h3>
                                <ul className={styles.courseList}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        document.querySelectorAll(`.${styles.courseList}`).forEach(e => e.classList.remove(styles.courseDropzone))
                                        e.target.closest(`.${styles.courseList}`).classList.add(styles.courseDropzone)
                                    }}
                                    onDrop={(e) => {
                                        onCardDropped(e, yearOrder, semesterLabel)
                                    }}>
                                    <StudyPlanCardList mappings={mappings} year={yearOrder} semester={semesterLabel}
                                                       isEditable={isEditable}/>
                                </ul>
                                {/*{isEditable &&*/}
                                {/*    <button className="add-course-button inv-button">*/}
                                {/*        <FontAwesomeIcon icon={faPlus}/>*/}
                                {/*    </button>*/}
                                {/*}*/}
                            </div>;
                        })
                        }
                    </div>
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