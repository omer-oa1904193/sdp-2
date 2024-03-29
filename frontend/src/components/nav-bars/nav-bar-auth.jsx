import {useUserStore} from "@/stores/userStore.js";
import React from "react";
import {AppBar, Box, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {faBell, faCircleUser, faHouse, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./AuthNavBar.module.css";
import {styled} from "@mui/system";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Link from "next/link";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4caf50",
        },
        secondary: {
            main: "#f50057",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#fff",
        },
    },
});
const UnderlinedTypography = styled(Typography)(({theme: customTheme}) => ({
    position: "relative",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block",
    "&::before, &::after": {
        content: "\"\"",
        position: "absolute",
        bottom: 0,
        width: 0,
        height: "3px",
        borderRadius: "3px",
        backgroundColor: customTheme.palette.text.primary,
        transition: "width 0.1s ease-in-out",
    },
    "&::before": {
        left: 0,
        transform: "scaleX(0)",
        transformOrigin: "left",
    },
    "&::after": {
        right: 0,
        transform: "scaleX(0)",
        transformOrigin: "right",
    },
    "&:hover::before": {
        width: "50%",
        transform: "scaleX(1)",
    },
    "&:hover::after": {
        width: "50%",
        transform: "scaleX(1)",
    },
}));


export default function NavBarPrivate() {
    const isActive = true;
    const userStore = useUserStore();

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={styles["auth-navbar"]}>
                    <div className={styles["nav-links"]}>

                        <button
                            className={styles["home-button"] + " " + styles["inv-button"] + " " + styles["link-button"]}>
                            <Link href="/dashboard">
                                <FontAwesomeIcon icon={faHouse}/>
                            </Link>
                        </button>

                        <nav>
                            <ul>
                                <li>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className={styles["nav-user"]}>
                        <div className={styles["divider"]}></div>
                        <button
                            className={`${styles["user-profile"]} ${styles["inv-button"]}`}>
                            <FontAwesomeIcon icon={faCircleUser}/>
                            <div className={styles["user-text"]}>

                                <h3>{userStore.user.name}</h3>
                                <p>{userStore.user.role}</p>
                            </div>
                        </button>

                        <button
                            className={`${styles["nav-icon-button"]} ${styles["inv-button"]}`}
                            onClick={() => {
                                delete localStorage.authToken;
                                userStore.setUser(null)
                            }}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                        </button>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
