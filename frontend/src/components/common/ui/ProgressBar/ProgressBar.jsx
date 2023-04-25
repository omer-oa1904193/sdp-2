import styles from "./ProgressBar.module.css"

export function ProgressBar({progress}) {
    return <>
        <div className={styles.progressBar}>
            <div className={styles.filled} style={{flexGrow: progress}}></div>
            <div className={styles.empty} style={{flexGrow: 100 - progress}}></div>
        </div>
    </>

}