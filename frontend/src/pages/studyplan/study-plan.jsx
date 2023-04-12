import React from 'react';
import { Grid, Box } from '@mui/material';
import CourseCard from '../../components/study-plan-components/coursecard'

const StudyPlan = () => {
    const cards = Array.from(Array(40).keys());

    return <>
        <Grid container spacing={2} sx={{ height: '100vh' }}>
            <Grid item sx={{ backgroundColor: '#FFFFFF', width: '7%' }}>
                {/* Content of first column */}
            </Grid>
            <Grid item sx={{ backgroundColor: '#EFEFEF', width: '74%' }}>
            <Box sx={{ paddingX: '20px' }}>
      <Grid container spacing={2} columns={{ xs: 5, sm: 8 }}>
        {cards.map((card) => (
          <Grid item xs={1} sm={1} key={card}>
            <CourseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
            </Grid>
            <Grid item sx={{ backgroundColor: '#FFFFFF', width: '17%' }}>
                {/* Content of third column */}
            </Grid>
        </Grid>
    </>

}

export default StudyPlan;
