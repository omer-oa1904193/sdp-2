import {SpinnerOverlay} from "@/components/common/SpinnerOverlay/SpinnerOverlay.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {Box, Grid, Stack, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {styled} from "@mui/material/styles";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import EditIconButton from "../../../components/study-plan-components/editButton.jsx"
import GearIconButton from "../../../components/study-plan-components/gearButton.jsx"
import StudyPlanSummary from "../../../components/study-plan-components/studyPlanSummary.jsx"

const StudyPlanProgressBar = styled(LinearProgress)({
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    "& .MuiLinearProgress-bar": {
        borderRadius: 5,
        backgroundColor: "#C96161",
    },
});


export default function StudyPlanPage(pageProps) {
    const router = useRouter()
    const userStore = useUserStore();
    const [studyPlan, setStudyPlan] = useState(null);
    const [orderedStudyPlan, setOrderedStudyPlan] = useState(null);

    useEffect(() => {
        userStore.fetchProtected(`/study-plans/${router.query.studyPlanId}`)
            .then(r => r.json())
            .then(d => setStudyPlan(d))
    }, [])

    useEffect(() => {
        if (!studyPlan)
            return;

        setOrderedStudyPlan(_ => {
            const ret = new Map();
            studyPlan.courses.forEach(course => {
                const year = `Year ${course.yearOrder}`;
                if (!ret.has(year))
                    ret.set(year, new Map([["Fall", []], ["Winter", []], ["Spring", []], ["Summer", []]]));
                ret.get(year).get(course.season).push(course);
            });
            studyPlan.electives.forEach(elective => {
                const year = `Year ${elective.yearOrder}`;
                if (!ret.has(year))
                    ret.set(year, new Map([["Fall", []], ["Winter", []], ["Spring", []], ["Summer", []]]));
                ret.get(year).get(elective.season).push(elective);
            });

            return ret;
        });
    }, [studyPlan])

    if (!studyPlan)
        return <SpinnerOverlay/>

    return <>
        <Grid container sx={{height: "100vh"}}>
            <Grid item sx={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                width: "8%"
            }}>
                <GearIconButton></GearIconButton>
                <EditIconButton></EditIconButton>
            </Grid>
            <Grid item sx={{padding: "15px", backgroundColor: "#EFEFEF", width: "74%"}}>

                <Stack direction="row" justifyContent="space-between" sx={{color: "#888888"}}>
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>Your Progress %</Typography>
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>{studyPlan.program.name}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} sx={{color: "#888888"}}>
                    <Typography sx={{fontWeight: "bold"}} variant="body1">Enrollment</Typography>
                    <StudyPlanProgressBar variant="determinate" value={60} sx={{flexGrow: 1}}/>
                    <Typography sx={{fontWeight: "bold"}} variant="body1">Graduation</Typography>
                </Stack>


                {orderedStudyPlan &&
                    <Box sx={{paddingX: "20px", display: "flex", flexWrap: "nowrap", overflowX: "auto"}}>
                        {Array.from(orderedStudyPlan).map(([yearLabel, yearSemesters]) => <div key={yearLabel}>
                            <p>{yearLabel}</p>
                            <div>
                                {Array.from(yearSemesters).map(([semesterLabel, courses]) => courses.length !== 0 &&
                                    <div key={semesterLabel}>

                                        <p>{semesterLabel}</p>
                                        <div>
                                            {courses.map((course) => <div key={course.id}>
                                                <p>{course.title}</p>
                                            </div>)}
                                        </div>
                                    </div>)}
                            </div>
                        </div>)}
                    </Box>
                }
            </Grid>


            <Grid item sx={{padding: "15px", backgroundColor: "#FFFFFF", width: "18%"}}>
                <StudyPlanSummary/>
            </Grid>
        </Grid>
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