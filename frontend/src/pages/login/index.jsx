import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay.jsx";
import styles from "@/pages/login/LoginPage.module.css";
import {useUserStore} from "@/stores/userStore.js";
import {useRouter} from "next/router.js";
import {useEffect, useState} from "react";

export default function LoginPage() {
    const [state, setState] = useState({
        email: "",
        password: "",
        loading: false,
        error: "",
    });
    const router = useRouter();
    const userStore = useUserStore();

    useEffect(() => {
        //if already logged in go to dashboard
        if (userStore.isAuthenticated())
            router.push("/dashboard");
    }, [router, userStore]);

    async function login(event) {
        event.preventDefault();
        setState({...state, loading: true, error: ""});
        //TODO move API calls somewhere else
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.email.toLowerCase(),
                password: state.password,
            })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.authToken = data.authToken;
            router.push("/dashboard");
        } else {
            setState({...state, loading: false, error: data.details});
        }
    }

    return <div className={styles.loginPage}>
        {state.loading && <SpinnerOverlay></SpinnerOverlay>}
        <div className={styles.introPane}>
            <div className={styles.titleDiv}>
                <h1>Welcome to Massar</h1>
                <p>Plan your semesters ahead of time and keep track of your graduation date.</p>
            </div>
            <img src="/logo.svg" alt="App Logo" className="logo"/>
        </div>
        <div className={styles.formPane}>
            <form onSubmit={(event) => login(event)}>
                <h2>Login</h2>
                <div className="input-label-div">
                    <label form="login-email">Email</label>
                    <input id="login-email" type="email" value={state.email}
                           autoComplete={"email"} required
                           onChange={(e) => setState({...state, email: e.target.value})}/>
                </div>
                <div className="input-label-div">
                    <label form="login-password">Password</label>
                    <input id="login-password" type="password" value={state.password}
                           autoComplete={"current-password"} required
                           onChange={(e) => setState({...state, password: e.target.value})}/>
                </div>
                <div className={styles.buttonDiv}>
                    <p className="error">{state.error}</p>
                    <button type="submit" className={`filled-button ${styles.loginButton}`}>Login</button>
                </div>
            </form>
        </div>
    </div>;

}

export function getServerSideProps() {
    return {
        props: {
            routeMetaData: {
                requiresAuth: false,
                showHeader: false
            }
        }
    }
}