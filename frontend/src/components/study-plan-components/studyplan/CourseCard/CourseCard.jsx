import {faCaretDown, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef} from "react";
import {COURSE_CATEGORIES} from "../../../../constants.js";
import "./CourseCard.css"

export function CourseCard({course, onCourseClicked, errorHighlighted, clearErrorHighlighted}) {
    const courseCard = useRef(null);
    useEffect(() => courseCard.current?.addEventListener("animationend", () => clearErrorHighlighted()), [courseCard])


    return <div onClick={onCourseClicked}
                ref={courseCard}
                className={`course-card ${course.completed ? "completed-course" : getCategoryClass(course.category)} ${errorHighlighted ? "error-highlighted" : ""}`}>
        {/*<FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>*/}
        <div className="title-div">
            <h4 className="course-title" lang="en">{course.title}</h4>
            <h5 className="course-code">{course.code} ({course.creditHours})</h5>
        </div>
        <div className="icons-div">
            {course.prerequisites.length > 0 &&
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            }
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