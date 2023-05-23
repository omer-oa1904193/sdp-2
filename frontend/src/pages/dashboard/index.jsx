import CreateStudyPlanDialogue
    from "@/components/dashboard-components/CreateStudyPlanDialogue/CreateStudyPlanDialogue.jsx";
import {GPAVisualizer} from "@/components/dashboard-components/GPAVisualizer/GPAVisualizer.jsx";
import StudyPlanCard from "@/components/dashboard-components/StudyPlanCard/StudyPlanCard.jsx";
import {useUserStore} from "@/stores/userStore.js";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import styles from "./DashBoardPage.module.css"

export default function DashboardPage() {
    const userStore = useUserStore();
    const [studyPlans, setStudyPlans] = useState([]);
    const [sharedStudyPlans, setSharedStudyPlans] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [currentSemester, setCurrentSemester] = useState();

    useEffect(() => {
        userStore.fetchProtected("/study-plans/")
            .then(r => r.json())
            .then(d => setStudyPlans(d))
    }, [isAddDialogOpen])

    useEffect(() => {
        userStore.fetchProtected("/study-plans/shared/")
            .then(r => r.json())
            .then(d => setSharedStudyPlans(d))
    }, [isAddDialogOpen])

    useEffect(() => {
        userStore.fetchProtected(`/semesters/current`).then(r => r.json()).then(d => setCurrentSemester(`${d.season} ${d.year}`))
    }, [userStore])


    return <div className={styles.dashboardPage}>
        <h2>Welcome</h2>
        <div className={styles.mainDashboard}>
            <div className={styles.studyPlansWrapper}>
                <section className={styles.sectionCard}>
                    <div className={styles.studyPlansTopDiv}>
                        <h3>Your Study Plans</h3>
                        <button className={`filled-button ${styles.addStudyPlanButton}`}
                                onClick={() => setIsAddDialogOpen(true)}>
                            <AddIcon/>
                            Add
                        </button>
                    </div>
                    {studyPlans.length !== 0 ?
                        <ul className={`styled-scrollbars ${styles.studyPlanList}`}>
                            {studyPlans.map(studyPlan => <li key={studyPlan.id}><StudyPlanCard studyPlan={studyPlan}/>
                            </li>)}
                        </ul> :
                        <div className={styles.emptyDiv}>
                            <p>No Study Plans.</p>
                        </div>
                    }
                </section>
                <section className={styles.sectionCard}>
                    <h3>Shared Plans</h3>
                    {sharedStudyPlans.length !== 0 ?
                        <ul>
                            {sharedStudyPlans.map(studyPlan => <li key={studyPlan.id}><StudyPlanCard
                                studyPlan={studyPlan}/>
                            </li>)}
                        </ul>
                        :
                        <div className={styles.emptyDiv}>
                            <p>No Shared Study Plans.</p>
                        </div>
                    }
                </section>
            </div>

            <aside className={`${styles.dashboardAside}`}>
                <div className={`${styles.sectionCard} ${styles.summeryCard}`}>
                    <GPAVisualizer gpa={3.72}></GPAVisualizer>
                    <div className={styles.detailDiv}>
                        <h6>Current Semester</h6>
                        <p>{currentSemester}</p>
                    </div>
                    <div className={styles.detailDiv}>
                        <h6>Semester GPA</h6>
                        <p>3.72</p>
                    </div>
                </div>
                <div className={`${styles.sectionCard}`}>
                    <h3>Recent Updates</h3>
                    {sharedStudyPlans.length !== 0 ?
                        <ol></ol>
                        :
                        <div className={styles.emptyDiv}>
                            <p>No recent updates.</p>
                        </div>
                    }
                </div>
            </aside>
        </div>
        <CreateStudyPlanDialogue
            isOpen={isAddDialogOpen}
            setOpen={setIsAddDialogOpen}
            closeDialogue={() => setIsAddDialogOpen(false)}>
        </CreateStudyPlanDialogue>
    </div>
}


export function getServerSideProps() {
    return {
        props: {
            routeMetaData: {
                requiresAuth: true,
                showHeader: true
            }
        }
    }
}