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


const Section = styled('div')({
    marginBottom: '10px',
});

const SummaryPanel = () => {
    return (
        <>
            <Title variant="h4">Summary Panel</Title>
            <Divider sx={{ my: 1, borderColor: '#B1B1B1', borderWidth: 1.5 }} />
            <Section>
                <Typography variant="h5">Section 1</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Item 1" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Item 2" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Item 3" />
                    </ListItem>
                </List>
            </Section>

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
