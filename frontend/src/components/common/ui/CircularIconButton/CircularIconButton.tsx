import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "@tanstack/react-location";
import React from "react";
import "./CircularIconButton.css"

export function CircularIconButton({icon, onClick, link}) {

    return <>
        {link ? <Link to={link}>
                <button className="inv-button circular-icon-button">
                    <FontAwesomeIcon icon={icon}/>
                </button>
            </Link>
            :
            <button className="inv-button circular-icon-button">
                <FontAwesomeIcon icon={icon}/>
            </button>
        }

    </>
}