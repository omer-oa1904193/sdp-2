import {useUserStore} from "@/stores/userStore.js";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import styles from "./StudyPlanCard.module.css";

export default function StudyPlanCard({studyPlan}) {
    const userStore = useUserStore();
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this study plan?");
        if (confirmed) {
            try {
                await userStore.fetchProtected(`/study-plans/${studyPlan.id}`, {
                    method: "DELETE"
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return <div className={styles.studyPlanCard}>
        <div className={styles.imageWrapper}>
            <img src="/study-plan.png" alt="Study Plan"/>
        </div>
        <div>
            <div className={styles.bottomDiv}>
                <Link style={{height: "100%", textDecoration: "none"}} href={`study-plans/${studyPlan.id}`}>
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
                </Link>
                {studyPlan.author == userStore.user.id &&
                    <button className={`inv-button ${styles.deleteButton}`} onClick={handleDelete}>
                        <DeleteIcon/>
                    </button>
                }
            </div>
        </div>
    </div>
}
