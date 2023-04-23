import {useUserStore} from "@/stores/userStore.js";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {
    const userStore = useUserStore();

    const router = useRouter();
    useEffect(() => {
        if (userStore.isAuthenticated()) {
            router.push("/dashboard")
        } else {
            router.push("/login")
        }
    }, [])

    return (
        <>
            Redirecting...
        </>
    )
}
