import {faCaretDown, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef} from "react";
import {COURSE_CATEGORIES} from "../../../../constants.js";
import {getCategoryClass} from "../CourseCard/CourseCard.jsx";
import styles from "./ElectiveCard.module.css"

export function ElectiveCard({
                                 electivePackage,
                                 onElectiveClicked,
                                 onCourseClicked,
                                 errorHighlighted,
                                 clearErrorHighlighted
                             }) {
    const courseCard = useRef(null);
    useEffect(() => courseCard.current?.addEventListener("animationend", () => clearErrorHighlighted()), [courseCard])
    if (electivePackage.currentCourse) {
        const electiveCourse = {
            ...electivePackage.currentCourse,
            semester: electivePackage.semester,
            year: electivePackage.year,
            category: electivePackage.category
        }
        return <>
            <div onClick={() => onCourseClicked(electiveCourse)}
                 ref={courseCard}
                 className={`${styles.electiveCard} ${electiveCourse.completed ? "completed-course" : getCategoryClass(electiveCourse.category)} ${errorHighlighted ? "error-highlighted" : ""}`}>
                <div className={styles.titleDiv}>
                    <h4 className={styles.courseTitle} lang="en">{electiveCourse.title}</h4>
                    <h5 className={styles.courseCode}>{electiveCourse.code} ({electiveCourse.creditHours})</h5>
                </div>
                <div className="icons-div">
                    {electiveCourse.prerequisites.length > 0 &&
                        <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                    }
                    <button className="inv-button show-electives-button" onClick={(e) => {
                        e.stopPropagation();
                        onElectiveClicked();
                    }}>
                        <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                    </button>
                </div>

            </div>
        </>

    }

    return <>
        <div className={`${styles.electiveCard} ${getCategoryClass(electivePackage.category)}`}>
            <h4 className={styles.packageName}>{electivePackage.category === COURSE_CATEGORIES.MAJOR_ELECTIVE ? "Major Elective" : electivePackage.title}</h4>
            <button className={`inv-button ${styles.showElectivesButton}`} onClick={onElectiveClicked}>
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </button>
        </div>
    </>
}

