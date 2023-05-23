import styles from "@/pages/dashboard/DashBoardPage.module.css";
import {useUserStore} from "@/stores/userStore.js";
import {useEffect, useState} from "react";
import * as React from "react";

export function RecentUpdatesCard() {
    const userStore = useUserStore();
    const [recentUpdates, setRecentUpdates] = useState([]);

    useEffect(() => {
        userStore.fetchProtected(`/notifications/`).then(r => r.json()).then(d => setRecentUpdates(d))
    }, [userStore])

    return <div className={`section-card`}>
        <h3>Recent Updates</h3>
        {recentUpdates.length !== 0 ?
            <ol>
                {recentUpdates.map((update, i) => <li key={i}>
                    {update.title}
                </li>)}
            </ol>
            :
            <div className={styles.emptyDiv}>
                <p>No recent updates.</p>
            </div>
        }
    </div>
}