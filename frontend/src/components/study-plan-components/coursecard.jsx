import React, { useState } from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";

const CourseCard = ({ title, subtitle, content }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
    ref={drag}
    sx={{ width: 'auto', height: 'auto' }}>
      <CardContent>
        <Typography sx={{  fontSize: 14 }} color="text.secondary" gutterBottom>
          
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
