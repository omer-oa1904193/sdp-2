import React from 'react';

const StudyPlan = () => {
    const userContext = useContext(UserContext);
    const match = useMatch();
    const params = match.params;
    const [originalStudyPlan, setOriginalStudyPlan] = useState(null);
    const [studyPlan, setStudyPlan] = useState(null);
    const [courseDialogueIsOpen, setCourseDialogueIsOpen] = useState(false)
    useEffect(() => {
        async function fetchStudyPlan() {
            const response = await userContext.fetchProtected(`${API_URL}/student-study-plans/${params.studyPlanId}`);
            return await response.json();
        }

        fetchStudyPlan().then(studyPlan => {
            setOriginalStudyPlan(studyPlan)
            setStudyPlan(initPlan(studyPlan));
        });
    }, [params.studyPlanId, userContext])

    if (studyPlan) {
        return <>
            <div className="study-plan-page">
                <div className="buttons-pane">
                    <CircularIconButton icon={faPen} link={"edit"}/>
                </div>

                <StudyPlanEditor studyPlan={studyPlan} isEditable={false}
                                 onCourseClicked={() => setCourseDialogueIsOpen(true)}/>
                <SummeryPane studyPlan={studyPlan}/>
                <CourseDialogue isOpen={courseDialogueIsOpen} setOpen={setCourseDialogueIsOpen}/>
            </div>
        </>
    }
}

export default StudyPlan;
