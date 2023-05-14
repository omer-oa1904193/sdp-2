import {CircularIconButton} from "@/components/common/ui/CircularIconButton/CircularIconButton.jsx";
import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import {CourseDialogue} from "@/components/study-plan-components/studyplan/CourseDialogue/CourseDialogue.jsx";
import {
    SelectElectiveDialogue
} from "@/components/study-plan-components/studyplan/ElectiveDialogue/SelectElectiveDialogue.jsx";
import {StudyPlanEditor} from "@/components/study-plan-components/studyplan/StudyPlanEditor/StudyPlanEditor.jsx";
import {SummeryPane} from "@/components/study-plan-components/studyplan/SummeryPane/SummeryPane.jsx";
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
    const [currentSemester, setCurrentsemester] = useState();
    useEffect(() => {
        userStore.fetchProtected(`/semesters/current`).then(r => r.json()).then(d => setCurrentsemester(`${d.season} ${d.year}`))
    }, [userStore])
    useEffect(() => {
        userStore.fetchProtected(`/study-plans/${studyPlanId}`)
            .then(r => r.json())
            .then(studyPlan => {
                const semesters = new Map();
                const stats = {
                    courseCount: studyPlan.courseMappings.length + studyPlan.electiveMappings.length,
                    completed: 0, progress: 0, creditHours: 0, tuitionFees: 0,
                }
                studyPlan.courseMappings.forEach(courseMapping => {
                    if (!semesters.has(`${courseMapping.season} ${courseMapping.year}`))
                        semesters.set(`${courseMapping.season} ${courseMapping.year}`, new Map());
                    courseMapping = {
                        ...courseMapping,
                        isElective: false,
                        get offering() {
                            return this.course
                        },
                        get isCompleted() {
                            return this.course.enrollments.filter(e => e.grade.numericalValue > 1.0).length > 0;
                        }
                    }
                    semesters.get(`${courseMapping.season} ${courseMapping.year}`).set(`course-${courseMapping.id}`, courseMapping);
                    stats.creditHours += courseMapping.course.creditHours;
                    stats.tuitionFees += courseMapping.course.cost;
                    stats.completed += courseMapping.isCompleted;
                });
                studyPlan.electiveMappings.forEach(electiveMapping => {
                    if (!semesters.has(`${electiveMapping.season} ${electiveMapping.year}`))
                        semesters.set(`${electiveMapping.season} ${electiveMapping.year}`, new Map());
                    if (electiveMapping.currentCourse) {
                        if (!(electiveMapping.electivePackage.id in selectedElectives))
                            selectedElectives[electiveMapping.electivePackage.id] = new Set();
                        selectedElectives[electiveMapping.electivePackage.id].add(electiveMapping.currentCourse.id)
                    }
                    electiveMapping = {
                        ...electiveMapping,
                        isElective: true,
                        get offering() {
                            return this.electivePackage
                        },
                        get isCompleted() {
                            return this.electivePackage.currentCourse && this.electivePackage.currentCourse.enrollments.filter(e => e.grade.numericalValue > 1.0).length > 0;
                        }
                    }
                    semesters.get(`${electiveMapping.season} ${electiveMapping.year}`).set(`elective-${electiveMapping.id}`, electiveMapping);
                    // stats.tuitionFees += electiveMapping.electivePackage.averageCost;
                    stats.creditHours += electiveMapping.electivePackage.creditHours;
                });

                setStudyPlan({...studyPlan, yearMap: semesters, stats});
            }).catch(e => {
            if (e.status === 404) {
                router.push("/404")
                return;
            }
            throw e;
        })
    }, [studyPlanId])


    if (!studyPlan || !currentSemester)
        return <SpinnerOverlay/>

    return <>
        <div className={styles.studyPlanPage}
             style={{gridTemplateColumns: isEditable ? "5fr auto" : "auto 5fr auto"}}>
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
                             isDirty={isDirty}
                             isEditable={isEditable}
                             onCourseClicked={(course) => setCourseDialogueCourse(course)}
                             onElectiveClicked={(mapping) => setSelectElectiveDialogMapping(mapping)}
                             currentSemester={currentSemester}
            />
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
