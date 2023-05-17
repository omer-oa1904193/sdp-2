import {BottomPane} from "@/components/common/ui/PopUpPane/BottomPane.jsx";
import {Spinner} from "@/components/common/ui/Spinner/Spinner.jsx";
import {CommentMessage} from "@/components/study-plan-components/CommentMessage/CommentMessage.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {useEffect, useState} from "react";
import styles from "./CommentsPane.module.css"

export function CommentsPane({studyPlanId}) {
    const userStore = useUserStore();
    const [comments, setComments] = useState([]);

    const [newCommentText, setNewCommentText] = useState("");
    const [refetch, setRefetch] = useState(true)
    useEffect(() => {
        if (refetch) {
            userStore.fetchProtected(`/study-plans/${studyPlanId}/comments`)
                .then(r => r.json())
                .then(d => setComments(d));
            setRefetch(false);
        }
    }, [refetch, studyPlanId, userStore])

    function onNewCommentSubmit(event) {
        event.preventDefault();
        if (newCommentText === "")
            return;

        userStore.fetchProtected(`/study-plans/${studyPlanId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                text: newCommentText
            })
        })
            .then(r => r.json())
            .then(d => {
                setRefetch(true)
                setNewCommentText("");
            });
    }

    return <BottomPane title="Comments">
        <div className={styles.container}>
            {refetch ?
                <Spinner/> :
                <ul className={`${styles.commentsList} ${"styled-scrollbars"}`}>
                    {comments.map(comment => <li key={comment.id}><CommentMessage comment={comment}/></li>)}
                </ul>
            }

            <form onSubmit={onNewCommentSubmit} className={styles.newCommentForm}>
                <textarea value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)}
                          rows={4}
                          maxLength={50000}/>
                <button type="submit" className={`filled-button ${styles.sendButton}`}>
                    Post
                </button>
            </form>
        </div>

    </BottomPane>
}
