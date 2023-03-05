import {FormEvent, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router.js";
import {API_URL} from "@/constants";
import {UserContext} from "@/contexts/UserContext";
import {SpinnerOverlay} from "@/components/common/ui/SpinnerOverlay/SpinnerOverlay";
import styles from "@/pages/login/LoginPage.module.css";

export default function LoginPage() {
    const [state, setState] = useState({
        email: "",
        password: "",
        loading: false,
        error: "",
    });
    const router = useRouter();
    const userContext = useContext(UserContext);

    useEffect(() => {
        //if already logged in go to dashboard
        if (userContext.user || localStorage.authToken)
            router.push("/dashboard");
    }, [router, userContext]);

    async function login(event: FormEvent) {
        event.preventDefault();
        setState({...state, loading: true, error: ""});
        //TODO move API calls somewhere else
        const response = await fetch(`${API_URL}/sessions/`, {
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
                    <button type="submit" className="main-button">Login</button>
                </div>
            </form>
        </div>
    </div>;

}