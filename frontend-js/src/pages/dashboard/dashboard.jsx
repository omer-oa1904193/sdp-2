import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavBarAuth from '../../components/nav-bars/nav-bar-auth'
import styles from "./DashboardPage.module.css";

const Dashboard = () => {
    return (
        <>
               {/* <div className={styles["dashboard-page"]}></div> */}
       
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '75%',
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
                         <Paper elevation={0}  sx={{ borderRadius: '10px' }}>

                         </Paper>
                         <Paper elevation={0}  sx={{ borderRadius: '10px' }} />
                    </Box>
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
