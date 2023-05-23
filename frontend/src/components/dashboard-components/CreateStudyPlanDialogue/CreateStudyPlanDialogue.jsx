import {Dialogue} from "@/components/common/ui/Dialogue/Dialogue.jsx";
import {MAIN_SEASONS, SEASONS_ORDER} from "@/constants.js";
import {useUserStore} from "@/stores/userStore.js";
import React, {useEffect, useState} from "react";
import styles from "./CreateStudyPlanDialogue.module.css";

export default function CreateStudyPlanDialogue({isOpen, setOpen, closeDialogue}) {
    const [programId, setProgramId] = useState("");
    const [name, setName] = useState("My Study Plan");
    const [yearStarted, setYearStarted] = useState("");
    const [seasonStarted, setSeasonStarted] = useState("");

    const userStore = useUserStore();
    const [programList, setProgramList] = useState([])
    useEffect(() => {
        userStore.fetchProtected("/programs/")
            .then(r => r.json())
            .then(d => setProgramList(d))
    }, [userStore])
    useEffect(() => {
        if (!isOpen) {
            setProgramId("");
            setName("");
            setYearStarted("");
        }
    }, [isOpen])

    const handleFormSubmit = (event) => {
        event.preventDefault();
        userStore.fetchProtected("/study-plans/", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                programId: Number(programId),
                seasonStarted: seasonStarted,
                yearStarted: Number(yearStarted)
            })
        }).then(closeDialogue)
    };


    return (
        <>
            <Dialogue isOpen={isOpen} setOpen={setOpen} closeOnOverlayClick={false} title="Add Study Plan">
                <div className={styles.createStudyPlanDialogue}>
                    <div className={styles.container}>
                        <form onSubmit={handleFormSubmit} className={styles.createStudyPlanForm}>
                            <select required defaultValue="" onChange={(e) => setProgramId(e.target.value)}>
                                <option value="" disabled>Select Program</option>
                                {programList.map(p =>
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                )}
                            </select>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"
                                   required></input>
                            <div className={styles.horizontalDiv}>
                                <input value={yearStarted} onChange={(e) => setYearStarted(e.target.value)}
                                       type="number"
                                       min="1970" max="2100" step="1"
                                       onKeyDown={(e) => {
                                           if (["e", "+", "-", ".", ","].includes(e.key)) {
                                               e.preventDefault();
                                           }
                                       }}
                                       placeholder="Starting year" required></input>
                                <select required defaultValue="" onChange={(e) => setSeasonStarted(e.target.value)}>
                                    <option value="" disabled>Starting Season</option>
                                    {MAIN_SEASONS.map(s =>
                                        <option key={s} value={s}>{s}</option>
                                    )}
                                </select>
                            </div>
                            <div className={styles.horizontalDiv}>
                                <button type="clear" onClick={closeDialogue} className="outlined-button">Cancel</button>
                                <button type="submit" className="filled-button">Add Study Plan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialogue>
        </>
    );
};

