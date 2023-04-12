import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CourseCard = ({ title, subtitle, content }) => {
  return (
    <Card sx={{ width: 'auto', height: 'auto' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="div">
          {subtitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
