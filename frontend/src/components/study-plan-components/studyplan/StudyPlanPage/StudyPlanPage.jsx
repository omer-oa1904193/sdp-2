import {CircularIconButton} from "@/components/common/ui/CircularIconButton/CircularIconButton.jsx";
import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import {CourseDialogue} from "@/components/study-plan-components/studyplan/CourseDialogue/CourseDialogue.jsx";
import {StudyPlanEditor} from "@/components/study-plan-components/studyplan/StudyPlanEditor/StudyPlanEditor.jsx";
import {SummeryPane} from "@/components/study-plan-components/studyplan/SummeryPane/SummeryPane.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {faGear, faMessage, faPen} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import styles from "./StudyPlanPage.module.css"

export default function StudyPlanBody({isEditable}) {
    const router = useRouter()
    const userStore = useUserStore();
    const [studyPlan, setStudyPlan] = useState(null);
    const [courseDialogueIsOpen, setCourseDialogueIsOpen] = useState(false)

    useEffect(() => {
        userStore.fetchProtected(`/study-plans/${router.query.studyPlanId}`)
            .then(r => r.json())
            .then(studyPlan => {
                const yearMap = new Map();
                const stats = {
                    courses: studyPlan.courseMappings.length + studyPlan.electiveMappings.length,
                    completed: 0, remaining: 0, progress: 0, creditHours: 0, tuitionFees: 0,
                }
                studyPlan.courseMappings.forEach(course => {
                    const year = `Year ${course.yearOrder}`;
                    if (!yearMap.has(year))
                        yearMap.set(year, new Map([["Fall", []], ["Winter", []], ["Spring", []], ["Summer", []]]));
                    yearMap.get(year).get(course.season).push(course);
                });
                studyPlan.electiveMappings.forEach(elective => {
                    const year = `Year ${elective.yearOrder}`;
                    if (!yearMap.has(year))
                        yearMap.set(year, new Map([["Fall", []], ["Winter", []], ["Spring", []], ["Summer", []]]));
                    yearMap.get(year).get(elective.season).push({...elective, isElective: true});
                });

                setStudyPlan({...studyPlan, yearMap, stats});
            })
    }, [])


    if (!studyPlan)
        return <SpinnerOverlay/>

    return <>
        <div className={styles.studyPlanPage}>
            {!isEditable &&
                <div className={styles.buttonsPane}>
                    <CircularIconButton icon={faPen} link={`/study-plans/${router.query.studyPlanId}/edit`}/>
                    <CircularIconButton icon={faGear}/>
                    <CircularIconButton icon={faMessage}/>
                </div>
            }
            <StudyPlanEditor studyPlan={studyPlan} isEditable={isEditable}
                             onCourseClicked={() => setCourseDialogueIsOpen(true)}/>
            <SummeryPane studyPlan={studyPlan}/>
            <CourseDialogue isOpen={courseDialogueIsOpen} setOpen={setCourseDialogueIsOpen}/>
        </div>
    </>

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