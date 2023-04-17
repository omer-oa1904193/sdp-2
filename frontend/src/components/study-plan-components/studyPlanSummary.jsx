import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Divider, Stack, Button, List, ListItem, ListItemText } from '@mui/material';

const Title = styled(Typography)({
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#858585',
});

const CoursesButton = styled(Button)({

    display: 'flex',
    justifyContent: 'space-between',
    background: '#EC8888',
    color: '#FFFFFF',
    fontSize: '0.7rem',
    height: '32px',
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': {
        background: '#FFFFFF',
        color: '#EC8888',
        boxShadow: 'none',
        fontWeight: 'bold'
    },
});

const StyledListItem = styled(ListItem)({
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#858585',
    '& > .MuiListItemText-root': {
      margin: 0,
      },
    '& > .MuiListItemText-root > .MuiTypography-root': {
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
  });  


const SummaryPanel = () => {
    return (
        <>
            <Title variant="h4">Summary Panel</Title>
            <Divider sx={{ my: 1, borderColor: '#B1B1B1', borderWidth: 1.5 }} />
            <div>
                <List padding='0px'>
                    <StyledListItem>
                        <ListItemText primary="Total Program Credit Hours" />
                        {/* <ListItemText  style={{ color: 'red' }} primary="130" /> */}
                        <ListItemText primary="130" />
                    </StyledListItem>
                    <StyledListItem>
                        <ListItemText primary="Total Program  Courses" />
                        <ListItemText primary="45" />
                    </StyledListItem>
                    <StyledListItem>
                    <ListItemText primary="Total Planned Credit Hours" />
                        <ListItemText primary="45" />
                    </StyledListItem>
                    <StyledListItem>
                    <ListItemText primary="Total Planned  Courses" />
                        <ListItemText primary="45" />
                    </StyledListItem>
                    <StyledListItem>
                    <ListItemText primary="Expected Graduation" />
                        <ListItemText primary="Spring 2023" />
                    </StyledListItem>
                    <StyledListItem>
                    <ListItemText primary="Total Tuition Fee" />
                        <ListItemText primary="QR 100,000" />
                    </StyledListItem>
                </List>
            </div>

            <Stack spacing={1.5}>
                <CoursesButton variant="contained">
                    <Typography variant='p'>Total Completed Courses</Typography>
                    <Typography>44</Typography>
                </CoursesButton>
                <CoursesButton variant="contained">
                    <Typography variant='p'>Total Remaining Courses</Typography>
                    <Typography>44</Typography>
                </CoursesButton>
            </Stack>


            <Divider sx={{ my: 2, borderColor: '#B1B1B1', borderWidth: 1.5 }} />
        </>
    );
};

export default SummaryPanel;
