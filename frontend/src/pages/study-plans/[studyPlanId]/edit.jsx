import {StudyPlanPage} from "@/components/study-plan-components/studyplan/StudyPlanPage/StudyPlanPage.jsx";
import {useRouter} from "next/router";
import React from "react";

export default function StudyPlanEditPage(pageProps) {
    const router = useRouter()
    return <>
        <StudyPlanPage studyPlanId={router.query.studyPlanId} isEditable={true} ></StudyPlanPage>
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