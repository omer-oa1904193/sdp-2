import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import React, {useContext, useEffect, useRef, useState} from "react";
import {API_URL, SEMESTERS} from "../../../../constants.js";
import {UserContext} from "../../../../contexts/UserContext.js";
import {canvas2Blob, compareCourses, compareTerm} from "../../../../utils.js";
import {ProgressBar} from "../../../common/ui/ProgressBar/ProgressBar.jsx";
import {CourseCard} from "../CourseCard/CourseCard.jsx";
import {ElectiveCard} from "../ElectiveCard/ElectiveCard.jsx";
import "./StudyPlanEditor.css"

export function StudyPlanEditor({studyPlan, setStudyPlan, isEditable, setDirty, onCourseClicked, onElectiveClicked}) {
    const userContext = useContext(UserContext)
    const [errorCourseId, setErrorCourseId] = useState(null)
    const studyPlanEditor = useRef(null);
    const [studyPlanScreenshot, setStudyPlanScreenshot] = useState(null);
    useEffect(() => {
        // htmlToImage.toCanvas(studyPlanEditor.current, {canvasWidth: 1920, canvasHeight: 1080}).then(canvas => {
        //     document.body.appendChild(canvas)
        // })
        html2canvas(studyPlanEditor.current, {
            windowWidth: 1920,
            scale: 2
        }).then(canvas => setStudyPlanScreenshot(canvas))
    }, [])

    async function saveStudyPlan() {
        const allCourses = [];
        studyPlan.years.forEach(y => allCourses.push(...Object.values(y).map(c => Object.values(c)).flat(1)));
        const courses = allCourses.filter(c => !c.isElective)
            .map(c => ({id: c.id, semester: c.semester, year: c.year}));
        const packages = allCourses.filter(c => c.isElective)
            .map(c => ({id: c.id, semester: c.semester, year: c.year, currentCourse: c.currentCourse?.id}));


        const formData = new FormData()
        if (studyPlanScreenshot)
            formData.append("image", await canvas2Blob(studyPlanScreenshot), `${studyPlan.id}.png`)
        formData.append("data", JSON.stringify({
            name: studyPlan.name,
            courses: courses,
            packages: packages,
        }));
        userContext.fetchProtected(`${API_URL}/student-study-plans/${studyPlan.id}`, {
            method: "PATCH",
            body: formData,
            headers: {}
        }).then(() => setDirty(false))
    }

    function onCourseDropped(event, toYear, toSemester) {
        const courseId = event.dataTransfer.getData("courseId");
        const fromYear = Number(event.dataTransfer.getData("fromYear"));
        const fromSemester = event.dataTransfer.getData("fromSemester");
        const courseListElement = event.target.closest(".course-list");
        if (!courseListElement)
            return
        courseListElement.classList.remove("course-dropzone")
        console.log(`${courseId} was dropped from ${fromSemester} ${fromYear} to ${toSemester} ${toYear}`)

        const course = studyPlan.years[fromYear - 1][fromSemester][courseId]
        if (fromSemester === toSemester && fromYear === toYear)
            return;
        let prerequisites;
        if (course.isElective)
            prerequisites = course?.currentCourse?.prerequisites;
        else
            prerequisites = course?.prerequisites;

        const latestPreReq = prerequisites?.map(preReq => ({
            ...preReq,
            ...studyPlan.coursesByCode[preReq.code],
        })).sort((p1, p2) => compareCourses(p1, p2))[0]
        if (latestPreReq) {
            const d = compareTerm(latestPreReq.year, latestPreReq.semester, toYear, toSemester)
            if ((latestPreReq.isConcurrect && d < 0) || (!latestPreReq.isConcurrect && d <= 0)) {
                setErrorCourseId(latestPreReq.id)
                return;
            }
        }
        let postrequisites;
        if (course.isElective)
            postrequisites = course?.currentCourse?.postrequisites;
        else
            postrequisites = course?.postrequisites;
        const earliestPostReq = postrequisites?.map(postReq => ({
            ...postReq,
            ...studyPlan.coursesByCode[postReq.code]
        })).sort((p1, p2) => compareCourses(p2, p1))[0]
        if (earliestPostReq) {
            const d = compareTerm(earliestPostReq.year, earliestPostReq.semester, toYear, toSemester)
            if ((earliestPostReq.isConcurrect && d > 0) || (!earliestPostReq.isConcurrect && d >= 0)) {
                setErrorCourseId(earliestPostReq.id)
                return;
            }
        }

        course.semester = toSemester;
        course.year = toYear;
        const years = studyPlan.years;
        years[toYear - 1][toSemester][courseId] = course;
        delete years[fromYear - 1][fromSemester][courseId];

        const coursesByCode = studyPlan.coursesByCode;
        coursesByCode[course.code] = course;
        setStudyPlan({...studyPlan, years, coursesByCode})
        setDirty(true);
    }

    return <div className="sp-editor styled-scrollbars">
        {isEditable ?
            <>
                <div className="top-div">
                    <div>
                        <h2 className="major-title">{studyPlan.program.major}</h2>
                        <h4 className="plan-title">{studyPlan.name}</h4>
                    </div>
                    <button className="main-button save-button" onClick={saveStudyPlan}>Save</button>
                </div>
            </>
            :
            <>
                <div className="top-div">
                    <h2>Your Progress %</h2>
                    <h2>{studyPlan.program.major}</h2>
                </div>
                <div className="progress-div">
                    <p>Enrollment</p>
                    <ProgressBar progress={studyPlan.stats.progress} className="progress-bar"/>
                    <p>Graduation</p>
                </div>
            </>
        }

        <div className="main-plan" ref={studyPlanEditor}>
            {
                studyPlan.years.map((year, yearNo) =>
                    <div key={yearNo} className="year-div">
                        <button className="year-button">Year {yearNo + 1}</button>
                        <div className="year-semesters">
                            {SEMESTERS.order.filter(s => year[s]).map(semester => {
                                return <div key={semester} className="semester-div">
                                    <h3 className="semester-button">{semester}</h3>
                                    <ul className={`course-list`}
                                        onDragOver={(e) => {
                                            e.preventDefault()
                                            document.querySelectorAll(".course-list").forEach(e => e.classList.remove("course-dropzone"))
                                            e.target.closest(".course-list").classList.add("course-dropzone")
                                        }}
                                        onDrop={(e) => {
                                            onCourseDropped(e, yearNo + 1, semester)
                                        }}>
                                        {Object.values(year[semester]).map(course =>
                                            <li key={course.id}
                                                id={`course-li-${course.id}`}
                                                draggable={isEditable}
                                                onDragStart={(e) => {
                                                    console.log(`${course.id} was dragged`)
                                                    e.dataTransfer.setData("courseId", course.id);
                                                    e.dataTransfer.setData("fromYear", `${yearNo + 1}`);
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

