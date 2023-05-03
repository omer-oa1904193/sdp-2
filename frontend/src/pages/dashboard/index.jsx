import { useUserStore } from "@/stores/userStore.js";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import styles from "@/pages/dashboard/DashBoardPage.module.css";
import StudyPlanCard from "../../components/dashboard-components/studyPlanCard";
import RectangularButton from "../../components/dashboard-components/rectangularButton";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

export function DashboardPage() {
    const boxRef = useRef();

    const handleScrollUp = () => {
        console.log(boxRef.current)
        if (boxRef.current) {
            boxRef.current.scrollTop -= (2* boxRef.current.clientHeight) / 8;
        }
    };

    const handleScrollDown = () => {
        if (boxRef.current) {
            boxRef.current.scrollTop += (2 * boxRef.current.clientHeight) / 8;
        }
    };
    const userStore = useUserStore();
    const [studyPlans, setStudyPlans] = useState([]);
    useEffect(() => {
        userStore.fetchProtected("/study-plans/")
            .then(r => r.json())
            .then(d => setStudyPlans(d))
    }, [])
    return (
        <>
            <Box sx={{ position: "relative", backgroundColor: "#EFEFEF" }}>
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
                                style={{ maxWidth: "100%", width: "calc(100% - 2rem)" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="h4" fontWeight="bold" color="#888888" sx={{ mb: 2 }}>
                                            Welcome
                                        </Typography>
                                        <Box
                                            className={styles.hideScroll}
                                            ref={boxRef}
                                            sx={{
                                                mb: 2,
                                                height: '100%',
                                                maxWidth: '100%',
                                                maxHeight: '8em',
                                                overflow: 'auto',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 8,
                                            }}
                                        >
                                            <Typography variant="body1"
                                                fontWeight="bold"
                                                color="#b3b3b3"
                                                sx={{ my: '1em' }}>
                                                Start by planning for your graduation by creating a study plan and selecting your program.</Typography>
                                            <Typography variant="body1"
                                                fontWeight="bold"
                                                color="#b3b3b3"
                                                sx={{ my: '1em' }}>
                                                Consider meeting with a guidance counselor to help you select the best program for your interests and career goals.</Typography>
                                            <Typography variant="body1"
                                                fontWeight="bold"
                                                color="#b3b3b3"
                                                sx={{ my: '1em' }}>
                                                With a solid plan in place, you'll be well on your way to achieving your educational and professional aspirations.</Typography>

                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <IconButton onClick={handleScrollUp}>
                                                <ArrowUpward />
                                            </IconButton>
                                            <IconButton onClick={handleScrollDown}>
                                                <ArrowDownward />
                                            </IconButton>
                                        </Box>

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
                                style={{ maxWidth: "100%", width: "calc(100% - 2rem)", overflow: "auto" }}
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
                            flexDirection: "row",
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


                        {studyPlans.map(studyPlan => (
                            // studyPlan.isActive ? (
                            //     <RectangularButton
                            //         text="Analyze current study plan"
                            //         studyPlan={studyPlan}
                            //         key={studyPlan.id}
                            //         linkTo="analyze/student/"
                            //     />
                            // ) : null
                            <RectangularButton
                                text="Analyze current study plan"
                                studyPlan={studyPlan}
                                key={studyPlan.id}
                                linkTo="analyze/student/"
                            />
                        ))}
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
