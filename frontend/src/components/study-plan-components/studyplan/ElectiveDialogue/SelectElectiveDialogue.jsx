import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import {useUserStore} from "@/stores/userStore.js";
import {useEffect, useState} from "react";
import {Dialogue} from "../../../common/ui/Dialogue/Dialogue.jsx";
import styles from "./SelectElectiveDialogue.module.css"

export function SelectElectiveDialogue({electiveMapping, setMapping, onCourseClicked}) {
    const userStore = useUserStore();
    const [electivePackage, setElectivePackage] = useState(null)
    useEffect(() => {
        if (!electiveMapping) {
            setElectivePackage(null);
            return;
        }
        userStore.fetchProtected(`/elective-packages/${electiveMapping.electivePackage.id}`)
            .then(r => r.json())
            .then(electivePackage => {
                setElectivePackage(electivePackage)
            })
    }, [electiveMapping])
    if (!electiveMapping)
        return

    return <Dialogue isOpen={!!electiveMapping} setOpen={setMapping} title="Select Elective">

        <div className={styles.electiveDialogue}>
            <h3 className={styles.packageName}>{electivePackage?.name} Package</h3>
            {electivePackage == null ? <div className={styles.loadingPadding}><SpinnerOverlay/></div> :
                <div className={`${styles.courseTableWrapper} styled-scrollbars`}>
                    <table className={styles.courseTable}>
                        <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Title</th>
                            <th>Credit Hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {electivePackage.courses.map((course) => (
                            <tr key={course.id} onClick={() => onCourseClicked(course)}>
                                <td>{course.code}</td>
                                <td>{course.title}</td>
                                <td>{course.creditHours}</td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                </div>
            }
        </div>

    </Dialogue>
}