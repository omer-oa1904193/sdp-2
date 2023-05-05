import {CircularIconButton} from "@/components/common/ui/CircularIconButton/CircularIconButton.jsx";
import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import {CourseDialogue} from "@/components/study-plan-components/studyplan/CourseDialogue/CourseDialogue.jsx";
import {
    SelectElectiveDialogue
} from "@/components/study-plan-components/studyplan/ElectiveDialogue/SelectElectiveDialogue.jsx";
import {StudyPlanEditor} from "@/components/study-plan-components/studyplan/StudyPlanEditor/StudyPlanEditor.jsx";
import {SummeryPane} from "@/components/study-plan-components/studyplan/SummeryPane/SummeryPane.jsx";
import {SEMESTERS} from "@/constants.js";
import {useUserStore} from "@/stores/userStore.js";
import {faGear, faMessage, faPen} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Score from "../../../score-study-plan/score"
import styles from "./StudyPlanPage.module.css"

export function StudyPlanPage({studyPlanId, isEditable, isDirty, setDirty}) {
    const router = useRouter()
    const userStore = useUserStore();
    const [studyPlan, setStudyPlan] = useState(null);
    const [courseDialogueCourse, setCourseDialogueCourse] = useState(null);
    const [selectElectiveDialogMapping, setSelectElectiveDialogMapping] = useState(null);
    const [selectedElectives, setSelectedElectives] = useState({});
    useEffect(() => {
        userStore.fetchProtected(`/study-plans/${studyPlanId}`)
            .then(r => r.json())
            .then(studyPlan => {
                const yearMap = new Map();
                const stats = {
                    courses: studyPlan.courseMappings.length + studyPlan.electiveMappings.length,
                    completed: 0, remaining: 0, progress: 0, creditHours: 0, tuitionFees: 0,
                }
                studyPlan.courseMappings.forEach(courseMapping => {
                    if (!yearMap.has(courseMapping.yearOrder))
                        yearMap.set(courseMapping.yearOrder, new Map(SEMESTERS.map(s => [s, new Map()])),);
                    yearMap.get(courseMapping.yearOrder).get(courseMapping.season).set(`course-${courseMapping.id}`, {
                        ...courseMapping,
                        isElective: false
                    });
                });
                studyPlan.electiveMappings.forEach(electiveMapping => {
                    if (!yearMap.has(electiveMapping.yearOrder))
                        yearMap.set(electiveMapping.yearOrder, new Map(SEMESTERS.map(s => [s, new Map()])),);
                    if (electiveMapping.currentCourse) {
                        if (!(electiveMapping.electivePackage.id in selectedElectives))
                            selectedElectives[electiveMapping.electivePackage.id] = new Set();
                        selectedElectives[electiveMapping.electivePackage.id].add(electiveMapping.currentCourse.id)
                    }
                    yearMap.get(electiveMapping.yearOrder).get(electiveMapping.season).set(`elective-${electiveMapping.id}`, {
                        ...electiveMapping,
                        isElective: true
                    });
                });

                setStudyPlan({...studyPlan, yearMap, stats});
            })
    }, [studyPlanId])


    if (!studyPlan)
        return <SpinnerOverlay/>

    return <>
        <div className={styles.studyPlanPage}>
            {!isEditable &&
                <div className={styles.buttonsPane}>
                    <Score studyPlan={studyPlan}></Score>
                    <CircularIconButton icon={faPen} link={`/study-plans/${router.query.studyPlanId}/edit`}/>
                    <CircularIconButton icon={faGear}/>
                    <CircularIconButton icon={faMessage}/>
                </div>
            }
            <StudyPlanEditor studyPlan={studyPlan}
                             setStudyPlan={setStudyPlan}
                             setDirty={setDirty}
                             isEditable={isEditable}
                             onCourseClicked={(course) => setCourseDialogueCourse(course)}
                             onElectiveClicked={(mapping) => setSelectElectiveDialogMapping(mapping)}/>
            <SummeryPane studyPlan={studyPlan}/>
            <CourseDialogue course={courseDialogueCourse} setCourse={setCourseDialogueCourse}/>
            <SelectElectiveDialogue electiveMapping={selectElectiveDialogMapping}
                                    setMapping={setSelectElectiveDialogMapping}
                                    packageSelectedElectivesSet={selectedElectives[selectElectiveDialogMapping?.electivePackage?.id] ?? new Set()}
                                    onElectiveSelected={(electiveCourse) => {
                                        const m = selectElectiveDialogMapping;
                                        if (!(m.electivePackage.id in selectedElectives))
                                            selectedElectives[m.electivePackage.id] = new Set();
                                        if (m.currentCourse)
                                            selectedElectives[m.electivePackage.id].delete(m.currentCourse.id)
                                        m.currentCourse = electiveCourse;
                                        selectedElectives[m.electivePackage.id].add(electiveCourse.id)
                                        setDirty(true);
                                        setSelectElectiveDialogMapping(null);
                                    }}/>
        </div>
    </>

}
