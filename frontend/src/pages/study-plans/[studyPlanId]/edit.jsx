import {StudyPlanPage} from "@/components/study-plan-components/studyplan/StudyPlanPage/StudyPlanPage.jsx";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

export default function StudyPlanEditPage(pageProps) {
    const router = useRouter();
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = "";
                return "You have unsaved changes. Are you sure you want to leave this page?";
            }
        };
        const handleRouteChange = (url) => {
            if (isDirty) {
                if (confirm("You have unsaved changes. Are you sure you want to leave this page?"))
                    setIsDirty(false);
                else {
                    router.events.emit("routeChangeError");
                    throw "Route change route aborted";
                }
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [isDirty, router.events]);

    return <>
        <StudyPlanPage
            studyPlanId={router.query.studyPlanId}
            isEditable={true}
            isDirty={isDirty}
            setDirty={setIsDirty}
        />
    </>
}


export function getServerSideProps() {
    return {
        props: {
            routeMetaData: {
                requiresAuth: true,
                showHeader: true
            }
        }
    }
}