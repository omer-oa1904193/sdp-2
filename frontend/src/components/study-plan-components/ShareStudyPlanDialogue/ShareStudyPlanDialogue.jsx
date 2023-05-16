import {Spinner} from "@/components/common/ui/Spinner/Spinner.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {Autocomplete, TextField} from "@mui/material";
import {useRouter} from "next/router.js";
import React, {useEffect, useState} from "react";
import {Dialogue} from "../../common/ui/Dialogue/Dialogue.jsx";
import styles from "./ShareStudyPlanDialogue.module.css"

export function ShareStudyPlanDialogue({isOpen, setOpen, studyPlanId}) {
    const userStore = useUserStore();
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (isOpen) {
            userStore.fetchProtected("/users/")
                .then(r => r.json())
                .then(d => setUsers(d.filter(u => u.id !== userStore.user.id)))
        }
    }, [userStore, isOpen])

    function onSubmit(event) {
        event.preventDefault();
        userStore.fetchProtected("/study-plans/shared/", {
            method: "POST",
            body: JSON.stringify({
                studyPlan: studyPlanId,
                userSharedWith: selectedUser,
            })
        })
            .then(_ => setOpen(false))
    }

    return <Dialogue isOpen={isOpen} setOpen={setOpen} title="Share Study Plan">
        <div className={styles.shareStudyPlanDialogue}>
            <div className={styles.container}>
                {users == null ? <Spinner/> :
                    <form onSubmit={onSubmit}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            getOptionLabel={(u) => `${u.name} - ${u.role}`}
                            value={selectedUser?.id}
                            onChange={(e, newValue) => setSelectedUser(newValue?.id)}
                            renderInput={(params) => <TextField {...params} label="Share with..."
                                                                inputProps={{...params.inputProps, required: true}}/>}
                        />

                        <div className={styles.horizontalDiv}>
                            <button type="clear" onClick={() => setOpen(false)} className="outlined-button">Cancel
                            </button>
                            <button type="submit" className="filled-button">Share Study Plan</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    </Dialogue>
}

