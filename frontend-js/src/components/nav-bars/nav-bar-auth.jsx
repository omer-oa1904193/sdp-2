import React from 'react';
import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { faBell, faCircleUser, faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AuthNavBar.module.css";

export default function NavBarPrivate() {
    return (
        <>
            {/* <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                        Massar
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <MenuItem sx={{ mr: 1 }}>Home</MenuItem>
                        <MenuItem>About</MenuItem>
                    </Box>
                </Toolbar>
            </AppBar> */}

            <div className={styles["auth-navbar"]}>
                <div className={styles["nav-links"]}>
                
                    <button className={styles["home-button"] + " " + styles["inv-button"] + " " + styles["link-button"]}>
                        <a href="/dashboard">
                            <FontAwesomeIcon icon={faHouse} />
                        </a>
                    </button>

                    <nav>
                        <ul>
                            <li>
                                <a href="/dashboard">
                                    Study Plan
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={styles["nav-user"]} >
                    <div className={styles["divider"]}></div>
                    <button 
                    className={`${styles['user-profile']} ${styles['inv-button']}`}>
                        <FontAwesomeIcon icon={faCircleUser} />
                        <div className={styles["user-text"]}>
                            
                            <h3>Taimoor Hussain</h3>
                            <p>Student</p>
                        </div>
                    </button>

                    <button 
                    className={`${styles['nav-icon-button']} ${styles['inv-button']}`}
                    onClick={() => { }}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </div>

        </>
    );
}
