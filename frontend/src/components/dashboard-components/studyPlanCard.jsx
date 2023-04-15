import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from "./StudyPlanCard.module.css";
import clsx from "clsx";

export default function StudyPlanCard({ isActive }) {
    return (
        <Link style={{ textDecoration: "none" }} href="#">
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
            justifyContent: "space-between",
          }}
        >
                    <Box className={styles["image-wrapper"]}>
                        <img src="/images/study-plan.png" alt="Study Plan" />
                    </Box>
                    <Box>
                        <Typography
                            color="#B1B1B1"
                            sx={{ lineHeight: "1.2em" }}
                            variant="h6"
                        >
                            Study plan x
                        </Typography>
                        <Typography
                            color="#B1B1B1"
                            sx={{ lineHeight: "1.2em" }}
                            variant="body2"
                        >
                            Computer Science
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Link>
    );
}
