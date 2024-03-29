import {COURSE_CATEGORIES} from "@/constants.js";
import {useEffect, useRef} from "react";
// import {COURSE_CATEGORIES} from "../../../../constants.js";
import styles from "./CourseCard.module.css";


export function CourseCard({
                               courseMapping,
                               isPastSemester,
                               isHidden,
                               onCourseClicked,
                               errorHighlighted,
                               clearErrorHighlighted
                           }) {
    const courseCard = useRef(null);
    useEffect(() => courseCard.current?.addEventListener("animationend", () => clearErrorHighlighted()), [courseCard])
    if (isHidden)
        return;
    return <div onClick={onCourseClicked}
                ref={courseCard}
                id={`course-${courseMapping.id}`}
                className={`${styles.courseCard} ${getCategoryClass(courseMapping.category)} ${(courseMapping.isCompleted && isPastSemester) ? "completed-course" : ""} ${errorHighlighted ? "error-highlighted" : ""}`}>
        {/*<FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>*/}
        <div className={styles.titleDiv}>
            <h4 className={styles.courseTitle} lang="en">{courseMapping.course.title}</h4>
            <h5 className={styles.courseCode}>{courseMapping.course.code} ({courseMapping.course.creditHours})</h5>
        </div>
        <div className={styles.iconsDiv}>
            {/*{course.prerequisites.length > 0 &&*/}
            {/*    <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>*/}
            {/*}*/}
        </div>
    </div>
}

export function getCategoryClass(category) {
    switch (category) {
        case COURSE_CATEGORIES.MAJOR_COURSE:
            return "major-course"
        case COURSE_CATEGORIES.CCP_COURSE:
            return "ccp-course";
        case COURSE_CATEGORIES.COLLEGE_REQUIREMENT:
            return "college-requirement"
        case COURSE_CATEGORIES.MAJOR_SUPPORTING:
            return "major-supporting"
        case COURSE_CATEGORIES.MAJOR_ELECTIVE:
            return "major-elective"
        default:
            return "";
    }
}