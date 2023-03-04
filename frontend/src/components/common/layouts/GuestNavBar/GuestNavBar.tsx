import {Link} from "@tanstack/react-location";
import "./GuestNavBar.css"

export function GuestNavBar() {
    return <>
        <div className="guest-navbar">
            <div className="nav-links">
                <Link to="/login">
                    <button className="login-button main-button">Login</button>
                </Link>
            </div>
        </div>
    </>;
}