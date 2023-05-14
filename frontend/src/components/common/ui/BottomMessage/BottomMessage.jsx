import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./BottomMessage.module.css"

export function BottomMessage({isShown, message, messageType, hide}) {
    if (!isShown)
        return;
    return <div className={styles.wrapper}>
        <div className={styles.messageBox}>
            <button className={`inv-button ${styles.iconButton}`} onClick={hide}>
                <FontAwesomeIcon icon={faClose}/>
            </button>
            <p>{message}</p>
        </div>
    </div>
}