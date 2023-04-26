import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./CircularIconButton.module.css"

export function CircularIconButton({icon, onClick, link}) {

    return <>
        {link ? <Link href={link}>
                <button className={`inv-button ${styles.circularIconButton}`}>
                    <FontAwesomeIcon icon={icon}/>
                </button>
            </Link>
            :
            <button className={`inv-button ${styles.circularIconButton}`}>
                <FontAwesomeIcon icon={icon}/>
            </button>
        }

    </>
}