import {useUserStore} from "@/stores/userStore.js";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console.js";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function RouteGuard({children}) {
    const router = useRouter()

    const userStore = useUserStore();
    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
                headers: {Authorization: `Bearer ${localStorage.authToken}`}
            });
            const data = await response.json();
            if (response.ok)
                return data;
            else
                return Promise.reject();
        }

        if (!userStore.user) {
            if (localStorage.authToken)
                fetchUser()
                    .then(user => userStore.setUser(user))
                    .catch(() => {
                        delete localStorage.authToken;
                        router.push("/login")
                    });
            else {
                router.push("/login")
            }
        }
    }, [userStore.user]);
    if (userStore.user) {
        return <>
            {children}
        </>;
    } else {
        return <>
            <p>Getting user...</p>
        </>;
    }
}