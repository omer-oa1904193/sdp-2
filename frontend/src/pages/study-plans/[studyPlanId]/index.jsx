import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import {StudyPlanEditor} from "@/components/study-plan-components/studyplan/StudyPlanEditor/StudyPlanEditor.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

export default function StudyPlanPage(pageProps) {
    const router = useRouter()
    const userStore = useUserStore();
    const [studyPlan, setStudyPlan] = useState(null);

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
        <StudyPlanEditor studyPlan={studyPlan}></StudyPlanEditor>
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