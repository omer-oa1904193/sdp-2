import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {styled} from "@mui/material/styles";
import React from "react";
import courseDetails from "../../../../sis-mocks/mybanner/data/courses.json"
import cards from "../../../../sis-mocks/mybanner/data/map-course-programs.json"
import EditIconButton from "../../components/study-plan-components/editButton"
import GearIconButton from "../../components/study-plan-components/gearButton"
import StudyPlanSummary from "../../components/study-plan-components/studyPlanSummary"

const StudyPlanProgressBar = styled(LinearProgress)({
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    "& .MuiLinearProgress-bar": {
        borderRadius: 5,
        backgroundColor: "#C96161",
    },
});


export default function StudyPlanPage() {

    const semesters = [
        {
            "id": 1,
            "year": 1
        },
        {
            "id": 2,
            "year": 1
        },
        {
            "id": 3,
            "year": 2
        },
        {
            "id": 4,
            "year": 2
        },
        {
            "id": 5,
            "year": 3
        },
        {
            "id": 6,
            "year": 3
        },
        {
            "id": 7,
            "year": 4
        },
        {
            "id": 8,
            "year": 4
        }
    ]

    const SemesterButton = styled(Button)({
        color: "#B1B1B1",
        border: "2px solid #B1B1B1",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
        textTransform: "none",
        fontSize: 15,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "\"Segoe UI\"",
            "Roboto",
            "\"Helvetica Neue\"",
            "Arial",
            "sans-serif",
            "\"Apple Color Emoji\"",
            "\"Segoe UI Emoji\"",
            "\"Segoe UI Symbol\"",
        ].join(","),
        "&:hover": {
            backgroundColor: "#919090",
            border: "2px solid #919090",
            color: "#FFFFFF",
        }
    });

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
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>Computer Engineering</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} sx={{color: "#888888"}}>
                    <Typography sx={{fontWeight: "bold"}} variant="body1">Enrollment</Typography>
                    <StudyPlanProgressBar variant="determinate" value={60} sx={{flexGrow: 1}}/>
                    <Typography sx={{fontWeight: "bold"}} variant="body1">Graduation</Typography>
                </Stack>


                <Box sx={{paddingX: "20px", display: "flex", flexWrap: "nowrap", overflowX: "auto"}}>
                    {semesters.map((semester) => (
                        <Box key={semester.id} sx={{marginBottom: "20px", width: "calc(100% / 8)", flexShrink: 0}}>
                            <SemesterButton
                                variant="outlined"
                                sx={{
                                    color: "#B1B1B1",
                                    border: "2px solid #B1B1B1",
                                    borderRadius: "10px",
                                    width: "75%",
                                }}
                            >
                                {semester.id % 2 !== 0 ? `Fall-${semester.year}` : `Spring-${semester.year}`}
                            </SemesterButton>

                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                {(semester.id % 2 !== 0 ? cards.filter(card => card.season === "Fall" && card.yearOrder === semester.year)
                                    :
                                    cards.filter(card => card.season === "Spring" && card.yearOrder === semester.year)).map((card) => {
                                    const matchingCourse = courseDetails.find(course => course.id === card.id);
                                    const courseName = matchingCourse ? matchingCourse.code : "Unknown Course";
                                    return (
                                        <Grid item xs={12} key={card.id}>
                                            <Typography variant="body1">{courseName}</Typography>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Grid>


            <Grid item sx={{padding: "15px", backgroundColor: "#FFFFFF", width: "18%"}}>
                <StudyPlanSummary/>
            </Grid>
        </Grid>
    </>

}
