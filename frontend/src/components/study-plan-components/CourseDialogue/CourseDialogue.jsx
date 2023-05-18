import {currencyFormatter} from "@/utils.js";
import {TreeItem} from "@mui/lab";
import {useState} from "react";
import {Dialogue} from "../../common/ui/Dialogue/Dialogue.jsx";
import styles from "./CourseDialogue.module.css"
import TreeView from "@mui/lab/TreeView";

export function CourseDialogue({course, setCourse}) {
    const [tabIndex, setTabIndex] = useState(0);
    if (!course)
        return
    return <Dialogue isOpen={!!course} setOpen={setCourse} title={`Course : ${course.code} ${course.title}`}>
        <div className={styles.courseDialogue}>
            <div className={styles.container}>
                <div className={styles.side}>
                    <ul>
                        <li className={tabIndex === 0 ? styles.highlightedTab : ""}
                            onClick={() => setTabIndex(0)}>
                            CourseDetails
                        </li>
                        <li className={tabIndex === 1 ? styles.highlightedTab : ""}
                            onClick={() => setTabIndex(1)}>
                            Prerequisites
                        </li>
                    </ul>
                </div>
                <div className={`${styles.main} styled-scrollbars`}>
                    {tabIndex === 0 ? <>
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
                    </> : <>
                        <div className={`styled-scrollbars ${styles.prereqTreeWrapper}`}>
                            <TreeView>
                                {renderTree(course.prerequisites)}
                            </TreeView>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    </Dialogue>
}


const renderTree = (node) => {
    if (Array.isArray(node))
        node.map((child) => renderTree(child))
    else if (typeof node === "object") {
        if (["course", "test", "and", "or"].some(k => k in node)) {
            const [key, value] = Object.entries(node)[0]
            return <TreeItem
                key={`${key}-${value.id}`}
                nodeId={`${key}-${value.id}`}
                label={key}
            >
                {Array.isArray(value)
                    ? value.map((child) => renderTree(child))
                    : renderTree(value)}
            </TreeItem>
        } else {

            return Object.entries(node).map(([k, v]) => <TreeItem
                key={`node-${node.id}-${k}-${v}`}
                nodeId={`node-${node.id}-${k}-${v}`}
                label={`${k}: ${v}`}>

            </TreeItem>)
        }
    }

};

