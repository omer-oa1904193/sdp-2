import {GPAVisualizer} from "@/components/dashboard-components/GPAVisualizer/GPAVisualizer.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {useEffect, useState} from "react";
import styles from "./GPACard.module.css"
import * as React from "react";

export function GPACard() {
    const [currentSemester, setCurrentSemester] = useState();

    const userStore = useUserStore();
    useEffect(() => {
        userStore.fetchProtected(`/semesters/current`).then(r => r.json()).then(d => setCurrentSemester(`${d.season} ${d.year}`))
    }, [userStore])

    return <div className={`section-card ${styles.summeryCard}`}>
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
}