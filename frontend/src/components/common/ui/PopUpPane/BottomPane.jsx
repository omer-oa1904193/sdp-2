import {useState} from "react";
import styles from "./BottomPane.module.css";

export function BottomPane({title, children}) {
    const [isOpen, setOpen] = useState(false);
    return <div className={styles.wrapper}>
        <div className={styles.pane}>
            <div className={styles.paneHeader} onClick={() => setOpen(!isOpen)}>
                <h3 className={styles.paneTitle}>{title}</h3>
            </div>
            <div className={`${styles.content} ${isOpen ? styles.poppedUp : styles.duckedDown}`}>
                {children}
            </div>
        </div>
    </div>
}