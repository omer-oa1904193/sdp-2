import {StudyPlanCardList} from "@/components/study-plan-components/studyplan/StudyPlanCardList/StudyPlanCardList.jsx";
import React, {useRef, useState} from "react";
import {ProgressBar} from "@/components/common/ui/ProgressBar/ProgressBar.jsx";
import {CourseCard} from "@/components/study-plan-components/studyplan/CourseCard/CourseCard.jsx";
import {ElectiveCard} from "../ElectiveCard/ElectiveCard.jsx";
import styles from "./StudyPlanEditor.module.css"

export function StudyPlanEditor({studyPlan, setStudyPlan, isEditable, setDirty, onCourseClicked, onElectiveClicked}) {
    const [errorCourseId, setErrorCourseId] = useState(null)
    const studyPlanEditor = useRef(null);

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
        // let prerequisites;
        // if (course.isElective)
        //     prerequisites = course?.currentCourse?.prerequisites;
        // else
        //     prerequisites = course?.prerequisites;
        //
        // const latestPreReq = prerequisites?.map(preReq => ({
        //     ...preReq,
        //     ...studyPlan.coursesByCode[preReq.code],
        // })).sort((p1, p2) => compareCourses(p1, p2))[0]
        // if (latestPreReq) {
        //     const d = compareTerm(latestPreReq.year, latestPreReq.semester, toYear, toSemester)
        //     if ((latestPreReq.isConcurrect && d < 0) || (!latestPreReq.isConcurrect && d <= 0)) {
        //         setErrorCourseId(latestPreReq.id)
        //         return;
        //     }
        // }
        // let postrequisites;
        // if (course.isElective)
        //     postrequisites = course?.currentCourse?.postrequisites;
        // else
        //     postrequisites = course?.postrequisites;
        // const earliestPostReq = postrequisites?.map(postReq => ({
        //     ...postReq,
        //     ...studyPlan.coursesByCode[postReq.code]
        // })).sort((p1, p2) => compareCourses(p2, p1))[0]
        // if (earliestPostReq) {
        //     const d = compareTerm(earliestPostReq.year, earliestPostReq.semester, toYear, toSemester)
        //     if ((earliestPostReq.isConcurrect && d > 0) || (!earliestPostReq.isConcurrect && d >= 0)) {
        //         setErrorCourseId(earliestPostReq.id)
        //         return;
        //     }
        // }
        //
        mapping.season = toSemester;
        mapping.yearOrder = toYear;
        const yearMap = studyPlan.yearMap;
        yearMap.get(toYear).get(toSemester).set(`${mappingType}-${mappingId}`, mapping);
        yearMap.get(fromYear).get(fromSemester).delete(`${mappingType}-${mappingId}`);
        setStudyPlan({...studyPlan, yearMap})
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

