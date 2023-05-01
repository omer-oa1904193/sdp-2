import {currencyFormatter} from "@/utils.js";
import {Dialogue} from "../../../common/ui/Dialogue/Dialogue.jsx";
import styles from "./CourseDialogue.module.css"

export function CourseDialogue({course, setCourse}) {
    if (!course)
        return
    return <Dialogue isOpen={!!course} setOpen={setCourse} title={`Course : ${course.code} ${course.title}`}>
        <div className={styles.courseDialogue}>
            <div className={styles.container}>
                <div className={styles.side}>
                    <ul>
                        <li>Course Details</li>
                        <li>Prerequisites</li>
                    </ul>
                </div>
                <div className={`${styles.main} styled-scrollbars`}>
                    <h2>Course Details</h2>
                    <div className={styles.courseInfo}>
                        <p>Title</p>
                        <p>{course.title}</p>
                    </div>

                    <div className={styles.courseInfo}>
                        <p>College</p>
                        <p>Engineering</p>
                    </div>

                    <div className={styles.courseInfo}>
                        <p>Department</p>
                        <p>Computer Science and Engineering</p>
                    </div>

                    <div className={styles.courseInfo}>
                        <p>Course Fee</p>
                        <p>{currencyFormatter.format(course.cost)}</p>
                    </div>

                    <div className={styles.courseInfo}>
                        <p>Credit Hours</p>
                        <p>{course.creditHours}</p>
                    </div>

                    <h2>Course Description</h2>
                    <p className={styles.description}>
                        {course.description}
                    </p>
                </div>
            </div>
        </div>
    </Dialogue>
}

