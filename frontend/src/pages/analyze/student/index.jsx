import React from 'react';
import {useRouter} from "next/router";
import {StudyPlanPage} from "@/components/study-plan-components/studyplan/StudyPlanPage/StudyPlanPage.jsx";


export default function StudentAnalyze(){
    const router = useRouter()
    return (
        <>
       <StudentAnalyzePage></StudentAnalyzePage>
        </>
    );
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
