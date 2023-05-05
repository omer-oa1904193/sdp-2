import {currencyFormatter} from "@/utils.js";
import {faCaretLeft, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef, useState} from "react";
import styles from "./SummeryPane.module.css"

export function SummeryPane({studyPlan}) {
    const pane = useRef();
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        if (isOpen)
            pane.current.style.maxWidth = "250px"
        else
            pane.current.style.maxWidth = "0"

    }, [isOpen])
    return <>
        <div className={styles.collapsablePaneWrapper}>
            <button onClick={() => setOpen(!isOpen)} className={`${styles.paneButton} inv-button`}>
                <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon>
            </button>
            <aside className={styles.collapsablePane} ref={pane}>
                <div className={styles.summeryPane}>
                    <div className={styles.statsDiv}>
                        <h3 className={styles.statHeader}>Summery</h3>
                        <hr></hr>
                        <h5 className={styles.statHeader}>Total Program Credit Hours</h5>
                        <p className={styles.statValue}>{studyPlan.program.creditHours}</p>
                        <h5 className={styles.statHeader}>Total Program Courses</h5>
                        <p className={styles.statValue}>{studyPlan.program.courseCount}</p>
                        <h5 className={styles.statHeader}>Total Planned Credit Hours</h5>
                        <p className={styles.statValue}>{studyPlan.stats.creditHours}</p>
                        <h5 className={styles.statHeader}>Total Planned Courses</h5>
                        <p className={styles.statValue}>{studyPlan.stats.courses}</p>
                        <h5 className={styles.statHeader}>Program Length</h5>
                        <p className={styles.statValue}>{studyPlan.yearMap.size} years</p>
                        <h5 className={styles.statHeader}>Total Tuition Fee</h5>
                        <p className={styles.statValue}>{currencyFormatter.format(studyPlan.stats.tuitionFees)}</p>
                    </div>
                    <div className={styles.courseCounts}>
                        <span className={styles.courseCountSpan}>
                            <p>Total Completed Courses</p>
                            <p>{studyPlan.stats.completed}</p>
                        </span>
                        <span className={styles.courseCountSpan}>
                            <p>Total Remaining Courses</p>
                            <p>{studyPlan.stats.remaining}</p>
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