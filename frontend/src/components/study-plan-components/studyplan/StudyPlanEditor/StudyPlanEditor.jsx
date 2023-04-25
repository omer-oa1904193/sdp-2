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

    function onCourseDropped(event, toYear, toSemester) {
        // const courseId = event.dataTransfer.getData("courseId");
        // const fromYear = Number(event.dataTransfer.getData("fromYear"));
        // const fromSemester = event.dataTransfer.getData("fromSemester");
        // const courseListElement = event.target.closest(".course-list");
        // if (!courseListElement)
        //     return
        // courseListElement.classList.remove("course-dropzone")
        // console.log(`${courseId} was dropped from ${fromSemester} ${fromYear} to ${toSemester} ${toYear}`)
        //
        // const course = studyPlan.years[fromYear - 1][fromSemester][courseId]
        // if (fromSemester === toSemester && fromYear === toYear)
        //     return;
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
        // course.semester = toSemester;
        // course.year = toYear;
        // const years = studyPlan.years;
        // years[toYear - 1][toSemester][courseId] = course;
        // delete years[fromYear - 1][fromSemester][courseId];
        //
        // const coursesByCode = studyPlan.coursesByCode;
        // coursesByCode[course.code] = course;
        // setStudyPlan({...studyPlan, years, coursesByCode})
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
            {Array.from(studyPlan.yearMap).map(([yearLabel, semesterMap]) =>
                <div key={yearLabel} className={styles.yearDiv}>
                    <button className={styles.yearButton}>{yearLabel}</button>
                    <div className={styles.yearSemesters}>
                        {Array.from(semesterMap).map(([semesterLabel, courses]) => {
                            if (courses.length === 0)
                                return <></>
                            return <div key={semesterLabel} className={styles.semesterDiv}>
                                <h3 className={styles.semesterButton}>{semesterLabel}</h3>
                                <ul className={styles.courseList}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        document.querySelectorAll(".course-list").forEach(e => e.classList.remove("course-dropzone"))
                                        e.target.closest(".course-list").classList.add("course-dropzone")
                                    }}
                                    onDrop={(e) => {
                                        onCourseDropped(e, yearLabel + 1, semesterLabel)
                                    }}>
                                    {courses.map(course =>
                                        <li key={course.id}
                                            id={`course-li-${course.id}`}
                                            draggable={isEditable}
                                            onDragStart={(e) => {
                                                console.log(`${course.id} was dragged`)
                                                e.dataTransfer.setData("courseId", course.id);
                                                e.dataTransfer.setData("fromYear", `${yearLabel + 1}`);
                                                e.dataTransfer.setData("fromSemester", semester);
                                            }
                                            }>
                                            {course.isElective ?
                                                <ElectiveCard electivePackage={course}
                                                              onElectiveClicked={() => isEditable ? onElectiveClicked(course) : undefined}
                                                              onCourseClicked={(course) => onCourseClicked(course)}
                                                              errorHighlighted={errorCourseId === course.id}
                                                              clearErrorHighlighted={() => setErrorCourseId(null)}/> :
                                                <CourseCard course={course}
                                                            onCourseClicked={() => onCourseClicked(course)}
                                                            errorHighlighted={errorCourseId === course.id}
                                                            clearErrorHighlighted={() => setErrorCourseId(null)}/>
                                            }
                                        </li>
                                    )}
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
            )
            }
        </div>
    </div>
}

