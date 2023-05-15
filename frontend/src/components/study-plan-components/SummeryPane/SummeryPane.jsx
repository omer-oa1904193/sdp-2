import {currencyFormatter} from "@/utils.js";
import {faCaretLeft, faCaretRight, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef, useState} from "react";
import styles from "./SummeryPane.module.css"

export function SummeryPane({studyPlan,currentSemester}) {
    const pane = useRef();
    const [isOpen, setOpen] = useState(true)
    useEffect(() => {
        if (isOpen) {
            pane.current.style.maxWidth = "300px"

        } else
            pane.current.style.maxWidth = "0"

    }, [isOpen])
    return <>
        <div className={styles.collapsablePaneWrapper}>
            <button onClick={() => setOpen(!isOpen)} className={`${styles.paneButton} inv-button`}>
                <FontAwesomeIcon icon={isOpen ? faCaretRight : faCaretLeft}></FontAwesomeIcon>
            </button>
            <aside className={styles.collapsablePane} ref={pane}>
                <div className={styles.summeryPane}>
                    <div className={styles.statsDiv}>
                        <h3 className={styles.statHeader}>Summery</h3>
                        <hr></hr>
                        <h5 className={styles.statHeader}>Credit Hours</h5>
                        <p className={styles.statValue}>{studyPlan.stats.earnedCreditHours}/{studyPlan.stats.creditHours}</p>
                        <h5 className={styles.statHeader}>Number of Courses</h5>
                        <p className={styles.statValue}>{studyPlan.stats.courseCount}</p>
                        <h5 className={styles.statHeader}>Program Length</h5>
                        <p className={styles.statValue}>{Math.floor(studyPlan.yearMap.size / 2)} years</p>
                        <h5 className={styles.statHeader}>Total Tuition Fee</h5>
                        <p className={styles.statValue}>{currencyFormatter.format(studyPlan.stats.tuitionFees)}</p>
                        <h5 className={styles.statHeader}>Current Semester</h5>
                        <p className={styles.statValue}>{currentSemester}</p>
                        <h5 className={styles.statHeader}>GPA</h5>
                        <p className={styles.statValue}>{studyPlan.stats.gpa}</p>
                    </div>
                    <div className={styles.courseCounts}>
                        <span className={styles.courseCountSpan}>
                            <p>Completed Courses</p>
                            <p>{studyPlan.stats.completedCourses}</p>
                        </span>
                        <span className={styles.courseCountSpan}>
                            <p>Remaining Courses</p>
                            <p>{studyPlan.stats.courseCount - studyPlan.stats.completedCourses}</p>
                        </span>
                    </div>
                    <hr></hr>
                    <div className={styles.categoryKeys}>
                        <div className={styles.categoryKey}>
                            <div className={`completed-course ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Completed Courses</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`major-course ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Major Courses</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`major-elective ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Major Electives</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`major-supporting ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Major Supporting Course</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`ccp-course ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>CCP Courses</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`college-requirement ${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>College Requirements</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`${styles.hasPrerequisites} ${styles.categoryKeyColor}`}>
                                <FontAwesomeIcon icon={faExclamationCircle}/>
                            </div>
                            <p className={styles.categoryKeyText}>Has Prerequisite</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Co-requisite</p>
                        </div>
                        <div className={styles.categoryKey}>
                            <div className={`${styles.categoryKeyColor}`}></div>
                            <p className={styles.categoryKeyText}>Prerequisite</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </>
}