import {StudyPlanPage} from "@/components/study-plan-components/StudyPlanPage/StudyPlanPage.jsx";
import {useRouter} from "next/router";
import React from "react";

export default function StudyPlanViewPage(pageProps) {
    const router = useRouter()
    return <>
        <StudyPlanPage studyPlanId={router.query.studyPlanId} isEditable={false} isDirty={false} setDirty={void 0}/>
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