import {Spinner} from "@/components/common/ui/Spinner/Spinner.jsx";
import CreateStudyPlanDialogue
    from "@/components/dashboard-components/CreateStudyPlanDialogue/CreateStudyPlanDialogue.jsx";
import {GPACard} from "@/components/dashboard-components/GPACard/GPACard.jsx";
import {RecentUpdatesCard} from "@/components/dashboard-components/RecentUpdatesCard/RecentUpdatesCard.jsx";
import StudyPlanCard from "@/components/dashboard-components/StudyPlanCard/StudyPlanCard.jsx";
import {USER_ROLES} from "@/constants.js";
import {useUserStore} from "@/stores/userStore.js";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {useEffect, useState} from "react";
import styles from "./DashBoardPage.module.css"

export default function DashboardPage() {
    const userStore = useUserStore();
    const [studyPlans, setStudyPlans] = useState([]);
    const [sharedStudyPlans, setSharedStudyPlans] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [refetchStudyPlans, setRefetchStudyPlans] = useState(true);
    const [refetchSharedPlans, setRefetchSharedPlans] = useState(true);

    useEffect(() => {
        if (refetchStudyPlans) {
            userStore.fetchProtected("/study-plans/")
                .then(r => r.json())
                .then(d => {
                    setStudyPlans(d);
                    setRefetchStudyPlans(false);
                })
        }
    }, [refetchStudyPlans, userStore])
    useEffect(() => {
        if (refetchSharedPlans) {
            userStore.fetchProtected("/study-plans/shared/")
                .then(r => r.json())
                .then(d => {
                    setSharedStudyPlans(d)
                    setRefetchSharedPlans(false);
                })
        }
    }, [refetchSharedPlans, userStore])

    return <div className={styles.dashboardPage}>
        <h2>Welcome</h2>
        <div className={styles.mainDashboard}>
            <div className={styles.studyPlansWrapper}>
                <section className={`section-card`}>
                    <div className={styles.studyPlansTopDiv}>
                        <h3>Your Study Plans</h3>
                        <button className={`filled-button ${styles.addStudyPlanButton}`}
                                onClick={() => setIsAddDialogOpen(true)}>
                            <AddIcon/>
                            Add
                        </button>
                    </div>
                    {refetchStudyPlans ? <div className={styles.loadingWrapper}><Spinner/></div> :
                        (studyPlans.length !== 0 ?
                            <ul className={`styled-scrollbars ${styles.studyPlanList}`}>
                                {studyPlans.map(studyPlan => <li key={studyPlan.id}>
                                    <StudyPlanCard studyPlan={studyPlan}
                                                   refetchStudyPlans={() => setRefetchStudyPlans(true)}/>
                                </li>)}
                            </ul> :
                            <div className={styles.emptyDiv}>
                                <p>No Study Plans.</p>
                            </div>)
                    }
                </section>
                <section className={`section-card`}>
                    <h3>Shared Plans</h3>

                    {refetchSharedPlans ? <div className={styles.loadingWrapper}><Spinner/></div> :
                        (sharedStudyPlans.length !== 0 ?
                            <ul>
                                {sharedStudyPlans.map(studyPlan => <li key={studyPlan.id}>
                                    <StudyPlanCard studyPlan={studyPlan}/>
                                </li>)}
                            </ul>
                            :
                            <div className={styles.emptyDiv}>
                                <p>No Shared Study Plans.</p>
                            </div>)
                    }
                </section>
            </div>

            <aside className={`${styles.dashboardAside}`}>
                {userStore.user.role === USER_ROLES.STUDENT && <GPACard/>}
                <RecentUpdatesCard/>
            </aside>
        </div>
        <CreateStudyPlanDialogue
            isOpen={isAddDialogOpen}
            setOpen={setIsAddDialogOpen}
            closeDialogue={() => {
                setIsAddDialogOpen(false);
                setRefetchStudyPlans(true);
            }}>
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