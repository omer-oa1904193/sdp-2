import React from 'react';
import {useRouter} from "next/router";
import AnalyzeForm from '../../../components/analyze/student/analyzeForm'


export default function StudentAnalyze(){
    const router = useRouter()
    return (
        <>
       <AnalyzeForm></AnalyzeForm>
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
