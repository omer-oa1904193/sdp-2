import React from 'react';
import {useRouter} from "next/router";
import {StudentAnalyzePage} from "@/components/study-plan-components/studyplan/StudyPlanPage/StudyPlanPage.jsx";


export default function StudentAnalyze(){
    const router = useRouter()
    return (
        <>
       {/* <StudentAnalyzePage></StudentAnalyzePage> */}
       test
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
