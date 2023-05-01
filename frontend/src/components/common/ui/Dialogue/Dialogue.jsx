import {useRef} from "react";
import styles from "./Dialogue.module.css"

export function Dialogue({children, isOpen, setOpen, title}) {
    const dialog = useRef(null)
    if (!isOpen)
        return;
    return <div ref={dialog} onClick={() => setOpen(false)} className={styles.dialogueBackdrop}>
        <div className={styles.customDialogue} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
                <h3 className={styles.dialogueTitle}>{title}</h3>
            </div>
            {children}
        </div>
    </div>
}