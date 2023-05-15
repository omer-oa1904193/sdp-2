import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect} from "react";
import styles from "./BottomMessage.module.css"

export function BottomMessage({message, hide}) {
    useEffect(() => {
        const timout = window.setTimeout(hide, 1500);
        return () => window.clearTimeout(timout);
    }, [message.isShown])

    return <div className={`${styles.wrapper} ${message.isShown && styles.visible}`}>
        <div className={`${styles.messageBox} ${MESSAGE_TYPE_CLASSES[message.type]}`}>
            <button className={`inv-button ${styles.iconButton}`} onClick={hide}>
                <FontAwesomeIcon icon={faClose}/>
            </button>
            <p>{message.text}</p>
        </div>
    </div>
}

export const MESSAGE_TYPES = {
    ERROR: "Error",
    WARNING: "Warning",
    OK: "Ok",
    INFO: "Info",
}
const MESSAGE_TYPE_CLASSES = {
    [MESSAGE_TYPES.ERROR]: styles.errorMessage,
    [MESSAGE_TYPES.WARNING]: styles.warningMessage,
    [MESSAGE_TYPES.OK]: styles.okMessage,
    [MESSAGE_TYPES.INFO]: styles.infoMessage,
}
