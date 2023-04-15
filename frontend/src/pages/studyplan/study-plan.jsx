import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import CourseCard from '../../components/study-plan-components/coursecard'
import courseDetails from "../../../../sis-mocks/mybanner/data/courses.json"
import cards from "../../../../sis-mocks/mybanner/data/map-course-programs.json"
import { styled } from '@mui/material/styles';

const StudyPlan = () => {

    const semesters = [
        {
            "id": 1,
            "year": 1
        },
        {
            "id": 2,
            "year": 1
        },
        {
            "id": 3,
            "year": 2
        },
        {
            "id": 4,
            "year": 2
        },
        {
            "id": 5,
            "year": 3
        },
        {
            "id": 6,
            "year": 3
        },
        {
            "id": 7,
            "year": 4
        },
        {
            "id": 8,
            "year": 4
        }
    ]

    const SemesterButton = styled(Button)({
        color: '#B1B1B1',
        border: '2px solid #B1B1B1',
        borderRadius: '10px',

        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#919090',
            border: '2px solid #919090',
            color: '#FFFFFF',
        }
    });

    return <>
        <Grid container spacing={2} sx={{ height: '100vh' }}>
            <Grid item sx={{ backgroundColor: '#FFFFFF', width: '7%' }}>
                {/* Content of first column */}
            </Grid>
            <Grid item sx={{ backgroundColor: '#EFEFEF', width: '74%' }}>
                <Box sx={{ paddingX: '20px', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                    {semesters.map((semester) => (
                        <Box key={semester.id} sx={{ marginBottom: '20px', width: 'calc(100% / 8)', flexShrink: 0 }}>
                            <SemesterButton
                                variant="outlined"
                                sx={{
                                    color: '#B1B1B1',
                                    border: '2px solid #B1B1B1',
                                    borderRadius: '10px',
                                    width: '100%',
                                }}
                            >
                                {semester.id % 2 !== 0 ? `Fall-${semester.year}` : `Spring-${semester.year}`}
                            </SemesterButton>

                            <Grid container spacing={2}>
                                {(semester.id % 2 !== 0 ? cards.filter(card => card.season === "Fall" && card.yearOrder === semester.year)
                                    :
                                    cards.filter(card => card.season === "Spring" && card.yearOrder === semester.year)).map((card) => {
                                        const matchingCourse = courseDetails.find(course => course.id === card.id);
                                        const courseName = matchingCourse ? matchingCourse.code : "Unknown Course";
                                        return (
                                            <Grid item xs={12} key={card.id}>
                                                <div>
                                                    <h4>{courseName}</h4>
                                                </div>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Grid>


            <Grid item sx={{ backgroundColor: '#FFFFFF', width: '17%' }}>
                {/* Content of third column */}
            </Grid>
        </Grid>
    </>

}

export default StudyPlan;
