import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavBarAuth from '../../components/nav-bars/nav-bar-auth'
import styles from "./DashboardPage.module.css";
import StudyPlanCard from "../../components/dashboard-components/studyPlanCard"
import Typography from '@mui/material/Typography';

const Dashboard = () => {
    return (
        <>
            <Box sx={{ position: 'relative', backgroundColor: '#EFEFEF' }}>
                <NavBarAuth />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        height: 'calc(100vh - 64px)',
                        top: '64px'
                    }}>
                    {/* ///////////////////////// */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '75%',
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                                '& > :not(style)': {
                                    mt: 3,
                                    mr: 0,
                                    mb: 1,
                                    ml: 3,
                                    flex: '1 1 auto',
                                    minWidth: 0
                                }
                            }}
                        >
                            <Paper elevation={0} sx={{
                                borderRadius: '10px',
                                '& >:not(style)': {
                                    m: '1rem'
                                }
                            }}
                            style={{ maxWidth: '100%', width: 'calc(100% - 2rem)'}}>
                                <Typography fontWeight="bold" color="#888888" variant="h4">Welcome</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                                '& > :not(style)': {
                                    mt: 3,
                                    mr: 0,
                                    mb: 1,
                                    ml: 3,
                                    flex: '1 1 auto',
                                    minWidth: 0
                                }
                            }}
                        >
                            <Paper elevation={0} sx={{
                                borderRadius: '10px',
                                '& > :not(style)': {
                                    m: '1rem'
                                }
                            }}
                            style={{ maxWidth: '100%', width: 'calc(100% - 2rem)', overflow: 'auto' }}
                            >
                                <Typography fontWeight="bold" color="#888888" variant="h5">Study Plans</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifycontent: 'stretch',
                                    columnGap: '1rem'
                                }}>
                                    <StudyPlanCard></StudyPlanCard>
                                    <StudyPlanCard></StudyPlanCard>
                                    {/* <StudyPlanCard></StudyPlanCard>
                                    <StudyPlanCard></StudyPlanCard>
                                    <StudyPlanCard></StudyPlanCard>
                                    <StudyPlanCard></StudyPlanCard> */}
                                </Box>
                            </Paper>

                        </Box>
                    </Box>
                    {/* ///////////////////////// */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '25%',
                            height: '50%',
                            flexDirection: 'column',
                            '& > :not(style)': {
                                mt: 3,
                                mr: 3,
                                mb: 1,
                                ml: 3,
                                flex: '1 1 auto',
                                minWidth: 0,
                                height: '100%',
                            }
                        }}
                    >
                        <Paper elevation={0} sx={{ borderRadius: '10px' }} />
                    </Box>
                </Box>
            </Box>

        </>
    );
}

export default Dashboard;
