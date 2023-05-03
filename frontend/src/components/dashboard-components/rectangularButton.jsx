import React from "react";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { Icon } from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {styled} from "@mui/material/styles";

export default function RectangularButton({ studyPlan, text, icon, linkTo }){

  // console.log(studyPlan)
    const CoursesButton = styled(Button)({
        background: "#267BAA",
        color: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "none",
        width: '100%',
        "&:hover": {
          background: "#FFFFFF",
          color: "#267BAA",
          boxShadow: "none",
          fontWeight: "bold",
          transform: "scale(1.02)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        },
      });
    
  return (
    <Link href={linkTo} passHref>
      <CoursesButton variant="contained">
        <QueryStatsIcon></QueryStatsIcon>
        <Typography sx={{ padding: '0px', fontWeight: "bold", fontSize: '0.7rem' }}>{text}</Typography>
      </CoursesButton>
    </Link>
  );
};
