import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./CircularIconButton.module.css";
import { Box } from "@mui/material";

export function CircularIconButton({ icon, onClick = () => {}, link }) {
  return (
    <Box display="flex" justifyContent="center">
      {link ? (
        <Link href={link}>
          <button
            className={`inv-button ${styles.circularIconButton}`}
            onClick={onClick}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        </Link>
      ) : (
        <button
          className={`inv-button ${styles.circularIconButton}`}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      )}
    </Box>
  );
}
