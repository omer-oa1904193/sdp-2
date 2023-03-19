import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
    return (
        <>
       <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '75%',
                    height: '100vh',
                    flexDirection: 'column',
                    '& > :not(style)': {
                        m: 1,
                        flex: '1 1 auto',
                        minWidth: 0
                    },
                }}
            >
                <Paper elevation={3} />
                <Paper elevation={3} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '25%',
                    height: '100vh',
                    flexDirection: 'column',
                    '& > :not(style)': {
                        m: 1,
                        flex: '1 1 auto',
                        minWidth: 0,
                        height: '100%',
                    },
                }}
            >
                <Paper elevation={3} />
            </Box>
            </Box>
        </>
    );
}

export default Dashboard;
