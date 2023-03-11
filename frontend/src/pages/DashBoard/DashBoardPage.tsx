import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../../../src/contexts/UserContext";
import {
    AddStudentStudyPlanDialogue
} from "../../components/page-components/dashboard/AddStudentStudyPlanDialogue/AddStudentStudyPlanDialogue.jsx";
import {StudyPlanCard} from "../../components/page-components/dashboard/StudyPlanCard/StudyPlanCard.jsx";
import {API_URL} from "../../constants.js";
import "./DashBoardPage.css"

export function DashBoardPage() {
    const userContext = useContext(UserContext);
    const [addStudentStudyPlanDialogueIsOpen, setAddStudentStudyPlanDialogueIsOpen] = useState(false);
    const [studyPlans, setStudyPlans] = useState([]);

    const fetchStudyPlans = useCallback(async function () {
        const response = await userContext.fetchProtected(`${API_URL}/student-study-plans/`);
        return await response.json();
    }, [userContext])

    useEffect(() => void fetchStudyPlans().then(studyPlans => setStudyPlans(studyPlans)), [fetchStudyPlans])
    return <>
        <div className="dashboard-page">
            <h1>Welcome</h1>
            <button onClick={() => setAddStudentStudyPlanDialogueIsOpen(true)} className="main-button add-study-plan-button">
                <FontAwesomeIcon icon={faPlus}/>New Study Plan
            </button>
            <section className="study-plans">
                {studyPlans.map(studyPlan => <StudyPlanCard key={studyPlan.id} studyPlan={studyPlan}/>)}
                <AddStudentStudyPlanDialogue isOpen={addStudentStudyPlanDialogueIsOpen}
                                             setOpen={setAddStudentStudyPlanDialogueIsOpen}
                                             onStudyPlanCreated={() => fetchStudyPlans().then(studyPlans => setStudyPlans(studyPlans))}/>
            </section>
        </div>
    </>;
}
