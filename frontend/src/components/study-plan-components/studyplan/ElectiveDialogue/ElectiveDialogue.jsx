import {Dialogue} from "../../../common/ui/Dialogue/Dialogue.jsx";
import "./ElectiveDialogue.css"

export function ElectiveDialogue({isOpen, setOpen, electivePackage, onCourseClicked}) {
    if (!electivePackage)
        return
    return <Dialogue isOpen={isOpen} setOpen={setOpen} title="Select Elective">
        <div className="elective-dialogue">
            <h3 className="package-name">{electivePackage.name} Package</h3>
            <div className="course-table-wrapper styled-scrollbars">
                <table className="course-table">
                    <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Credit Hours</th>
                    </tr>
                    </thead>
                    <tbody>
                    {electivePackage.courses.map((course) => (
                        <tr key={course.id} onClick={() => onCourseClicked(course)}>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.creditHours}</td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </Dialogue>
}