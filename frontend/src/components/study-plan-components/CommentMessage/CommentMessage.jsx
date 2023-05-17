import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./CommentMessage.module.css"

export function CommentMessage({comment}) {
    return <div className={styles.commentWrapper}>
        <div className={styles.authorDiv}>
            <FontAwesomeIcon icon={faCircleUser}/>
            <div className={styles.authorText}>
                <p className={styles.authorName}>{comment.author.name}</p>
                <p className={styles.authorRole}>{comment.author.role}</p>
            </div>
        </div>
        <div className={styles.commentBody}>
            <p>{comment.text}</p>
        </div>
    </div>
}