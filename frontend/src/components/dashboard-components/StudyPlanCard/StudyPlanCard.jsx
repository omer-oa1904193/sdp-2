import EditIcon from "@mui/icons-material/Edit";
import {Box, Grid, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import Link from "next/link";
import React, {useState} from "react";
import CheckIconButton from "../activeCheckIcon.jsx";
import EditStudyPlanCard from "../editStudyPlanCard.jsx";
import RectangularButton from "../rectangularButton.jsx";
import styles from "./StudyPlanCard.module.css";

export default function StudyPlanCard({studyPlan, isActive}) {

    const EditButton = styled(IconButton)(({theme}) => ({
        color: "#FFFFFF",
        background: "#267BAA",
        borderRadius: "50%",
        "&:hover": {
            background: "#267BAA",
            color: "#FFFFFF",
        },
        width: "24px",
        height: "24px",
    }));

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditButtonClick = (event) => {
        event.stopPropagation();
        setIsEditDialogOpen(true);
    };

    return (

        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                },
            }}
        >
            <Paper
                className={clsx(styles.studyPlanCard, {
                    [styles.active]: isActive,
                })}
                elevation={1}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>

                <Box className={styles.imageWrapper}>
                    <img src="/study-plan.png" alt="Study Plan"/>
                </Box>
                <Box>
                    <Grid container spacing={2} justifyContent="space-between" alignItems="flex-end">
                        <Link style={{height: "100%", textDecoration: "none"}} href={`study-plans/${studyPlan.id}`}>
                            <Grid item xs={8} sx={{height: "100%", padding: "0px", margin: "0px"}}>
                                <Box>
                                    <Typography
                                        color="#B1B1B1"
                                        sx={{lineHeight: "1.2em"}}
                                        variant="h6"
                                        noWrap
                                    >
                                        {studyPlan.name}
                                    </Typography>
                                    <Typography
                                        color="#B1B1B1"
                                        sx={{lineHeight: "1.2em"}}
                                        variant="body2"
                                        noWrap
                                    >
                                        {studyPlan.program.name}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Link>
                        <Grid item xs={4} sx={{display: "flex", justifyContent: "flex-end"}}>

                            {isActive ? <Stack direction="row">
                                    <CheckIconButton/>
                                    <EditIcon/>
                                </Stack>
                                :
                                <>
                                    <EditButton onClick={(event) => {
                                        handleEditButtonClick(event)
                                    }} aria-label="settings">
                                        <EditIcon sx={{fontSize: "16px"}}/>
                                    </EditButton>
                                    {isEditDialogOpen && (
                                        <EditStudyPlanCard isEditDialogOpen={isEditDialogOpen}
                                                           setIsEditDialogOpen={setIsEditDialogOpen}
                                                           studyPlan={studyPlan}/>
                                    )}
                                </>
                            }
                        </Grid>
                    </Grid>
                </Box>

                {/*<RectangularButton*/}
                {/*    text="Analyze study plan"*/}
                {/*    studyPlan={studyPlan}*/}
                {/*    key={studyPlan.id}*/}
                {/*    linkTo={`analyze/student/${studyPlan.id}`}*/}
                {/*/>*/}
            </Paper>
        </Box>
    );
}
