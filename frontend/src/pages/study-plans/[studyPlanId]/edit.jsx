import StudyPlanBody from "@/components/study-plan-components/studyplan/StudyPlanPage/StudyPlanPage.jsx";
import {useRouter} from "next/router";
import React from "react";

export default function StudyPlanPage(pageProps) {
    const router = useRouter()
    return <>
        <StudyPlanBody isEditable={true}></StudyPlanBody>
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