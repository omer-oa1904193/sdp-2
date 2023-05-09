import React, { useState, useEffect } from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import { Box, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "./StudyPlanCard.module.css";
import clsx from "clsx";
import CheckIconButton from "./activeCheckIcon";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import EditStudyPlanCard from "./editStudyPlanCard";
import RectangularButton from "../../components/dashboard-components/rectangularButton";

export default function StudyPlanCard({fetchStudyPlans,studyPlan, isActive }) {

    const EditButton = styled(IconButton)(({ theme }) => ({
        color: '#FFFFFF',
        background: '#267BAA',
        borderRadius: '50%',
        '&:hover': {
            background: '#267BAA',
            color: '#FFFFFF',
        },
        width: '24px',
        height: '24px',
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
                        width: 200,
                        height: 150,
                    },
                }}
            >
                <Paper
                    className={clsx(styles["study-plan-card"], {
                        [styles.active]: isActive,
                    })}
                    elevation={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <Box className={styles["image-wrapper"]}>
                        <img src="/study-plan.png" alt="Study Plan" />
                    </Box>
                    <Box>
                        <Grid container spacing={2} justifyContent="space-between" alignItems="flex-end">
                            <Grid item xs={8} sx={{ height: '100%', padding: '0px', margin: '0px' }}>
                            <Link style={{height:"100%",textDecoration: "none" }} href={`study-plans/${studyPlan.id}`}>
                                <Box>
                                    <Typography
                                        color="#B1B1B1"
                                        sx={{ lineHeight: "1.2em" }}
                                        variant="h6"
                                        noWrap
                                    >
                                        {studyPlan.name}
                                    </Typography>
                                    <Typography
                                        color="#B1B1B1"
                                        sx={{ lineHeight: "1.2em" }}
                                        variant="body2"
                                        noWrap
                                    >
                                        {studyPlan.program.name}
                                    </Typography>
                                </Box>
                                </Link>
                            </Grid>
                            
                            <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>

                                {isActive ? <Stack direction="row">
                                    <CheckIconButton />
                                    <EditIcon />
                                </Stack>
                                    :
                                    <>
                                        <EditButton onClick={(event)=> {handleEditButtonClick(event)}} aria-label="settings">
                                            <EditIcon sx={{ fontSize: '16px' }} />
                                        </EditButton>
                                        {isEditDialogOpen && (
                                            <EditStudyPlanCard fetchStudyPlans={fetchStudyPlans} isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} studyPlan={studyPlan} />
                                        )}
                                    </>
                                }


                            </Grid>
                        </Grid>
                    </Box>

                    <RectangularButton
                        text="Analyze study plan"
                        studyPlan={studyPlan}
                        key={studyPlan.id}
                        linkTo={`analyze/student/${studyPlan.id}`}
                    />
                    {/* <DeleteIcon></DeleteIcon> */}
                </Paper>
            </Box>
    );
}
