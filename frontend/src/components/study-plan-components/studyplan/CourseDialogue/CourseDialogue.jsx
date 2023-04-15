import {currencyFormatter} from "../../../../utils.js";
import {Dialogue} from "../../../common/ui/Dialogue/Dialogue.jsx";
import "./CourseDialogue.css"

export function CourseDialogue({course, isOpen, setOpen}) {
    if (!course)
        return
    return <Dialogue isOpen={isOpen} setOpen={setOpen} title={`Course : ${course.code} ${course.title}`}>
        <div className="course-dialogue">
            <div className="container">
                <div className="side">
                    <ul>
                        <li>Course Details</li>
                        <li>Prerequisites</li>
                    </ul>
                </div>
                <div className="main styled-scrollbars">
                    <h2>Course Details</h2>
                    <div className="course-info">
                        <p>Title</p>
                        <p>{course.title}</p>
                    </div>

                    <div className="course-info">
                        <p>College</p>
                        <p>Engineering</p>
                    </div>

                    <div className="course-info">
                        <p>Department</p>
                        <p>Computer Science and Engineering</p>
                    </div>

                    <div className="course-info">
                        <p>Course Fee</p>
                        <p>{currencyFormatter.format(course.cost)}</p>
                    </div>

                    <div className="course-info">
                        <p>Credit Hours</p>
                        <p>{course.creditHours}</p>
                    </div>

                    <h2>Course Description</h2>
                    <p className="description">
                        {course.description}
                    </p>
                </div>
            </div>
        </div>
    </Dialogue>
}

