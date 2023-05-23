import {currencyFormatter} from "@/utils.js";
import {TreeItem} from "@mui/lab";
import {useState} from "react";
import {JSONTree} from "react-json-tree";
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
                            <JSONTree data={course.prerequisites} theme={{
                                scheme: "default",
                                author: "chris kempson (http://chriskempson.com)",
                                base00: "#181818",
                                base01: "#282828",
                                base02: "#383838",
                                base03: "#585858",
                                base04: "#b8b8b8",
                                base05: "#d8d8d8",
                                base06: "#e8e8e8",
                                base07: "#f8f8f8",
                                base08: "#ab4642",
                                base09: "#dc9656",
                                base0A: "#f7ca88",
                                base0B: "#a1b56c",
                                base0C: "#86c1b9",
                                base0D: "#7cafc2",
                                base0E: "#ba8baf",
                                base0F: "#a16946"
                            }}
                                      invertTheme={true}
                                      hideRoot={true}
                                      getItemString={(_1, _2, _3, itemString, keyPath) => <span>{itemString}</span>}
                            />;
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    </Dialogue>
}

