import {useUserStore} from "@/stores/userStore.js";
import {useEffect, useState} from "react";
import * as React from "react";
import {Box, Grid, Paper, Typography} from "@mui/material";
import styles from "@/pages/dashboard/DashBoardPage.module.css";
import StudyPlanCard from "../../components/dashboard-components/studyPlanCard";

export function DashboardPage() {
    const userStore = useUserStore();
    const [studyPlans, setStudyPlans] = useState([]);
    useEffect(() => {
        userStore.fetchProtected("/study-plans/")
            .then(r => r.json())
            .then(d => setStudyPlans(d))
    }, [])
    return (
        <>
            <Box sx={{position: "relative", backgroundColor: "#EFEFEF"}}>
                {/* <NavBarAuth /> */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        height: "calc(100vh - 64px)",
                        top: "64px"
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "75%",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                height: "100%",
                                flexDirection: "column",
                                "& > :not(style)": {
                                    mt: 3,
                                    mr: 0,
                                    mb: 1,
                                    ml: 3,
                                    flex: "1 1 auto",
                                    minWidth: 0
                                }
                            }}
                        >
                            <Paper elevation={0} sx={{
                                borderRadius: "10px",
                                "& >:not(style)": {
                                    m: "1rem"
                                }
                            }}
                                   style={{maxWidth: "100%", width: "calc(100% - 2rem)"}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="h4" fontWeight="bold" color="#888888" sx={{mb: 2}}>
                                            Welcome
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold" color="#b3b3b3" sx={{mb: 2}}>
                                            Start by planning for your graduation by creating a study plan and selecting
                                            your program.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {/*<StudyPlanCard studyPlan={} isActive={true}/>*/}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                height: "100%",
                                flexDirection: "column",
                                "& > :not(style)": {
                                    mt: 3,
                                    mr: 0,
                                    mb: 1,
                                    ml: 3,
                                    flex: "1 1 auto",
                                    minWidth: 0
                                }
                            }}
                        >
                            <Paper elevation={0} sx={{
                                borderRadius: "10px",
                                "& > :not(style)": {
                                    m: "1rem"
                                }
                            }}
                                   style={{maxWidth: "100%", width: "calc(100% - 2rem)", overflow: "auto"}}
                            >
                                <Typography fontWeight="bold" color="#888888" variant="h5">Study Plans</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifycontent: "stretch",
                                    columnGap: "1rem"
                                }}>
                                    {studyPlans.map(studyPlan => (
                                        <StudyPlanCard studyPlan={studyPlan} key={studyPlan.id}></StudyPlanCard>
                                    ))}
                                </Box>
                            </Paper>

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "25%",
                            height: "50%",
                            flexDirection: "column",
                            "& > :not(style)": {
                                mt: 3,
                                mr: 3,
                                mb: 1,
                                ml: 3,
                                flex: "1 1 auto",
                                minWidth: 0,
                                height: "100%",
                            }
                        }}
                    >
                        <Paper elevation={0} sx={{
                            borderRadius: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            height: "100%"
                        }}>
                            <Box>
                                <Typography fontWeight="bold" color="#888888" variant="h5">Cumulative GPA</Typography>
                                <Typography fontWeight="bold" color="#267BAA" variant="h2">3.2</Typography>
                            </Box>
                        </Paper>

                    </Box>
                </Box>
            </Box>
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

export default DashboardPage;
