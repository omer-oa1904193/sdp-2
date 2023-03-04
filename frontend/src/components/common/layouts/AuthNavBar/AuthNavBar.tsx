import {faBell, faCircleUser, faHouse, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useMatchRoute} from "@tanstack/react-location";
import {useContext} from "react";
import "src/components/common/layouts/AuthNavBar/AuthNavBar.css";
import {UserContext} from "../../../../contexts/UserContext.js";

export function AuthNavBar() {
    const matchRoute = useMatchRoute();
    const userContext = useContext(UserContext);
    const user = userContext.user;

    return <>
        <div className="auth-navbar">
            <div className="nav-links">
                <button className="home-button inv-button link-button">
                    <Link to="/dashboard"
                          className={`${matchRoute({to: "/dashboard"}) ? "current-tab" : ""}`}>
                        <FontAwesomeIcon icon={faHouse}/>
                    </Link>
                </button>

                <nav>
                    <ul>
                        <li>
                            <Link to={`/student/study-plans/${user.currentStudyPlan}`}
                                  className={`${matchRoute({to: "/student/study-plans/:studyPlanId"}) ? "current-tab" : ""}`}>
                                Study Plan
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="nav-user">
                {/*<button className="nav-icon-button inv-button">*/}
                {/*    <FontAwesomeIcon icon={faBell}/>*/}
                {/*</button>*/}

                <div className="divider"></div>
                <button className="user-profile inv-button">
                    <FontAwesomeIcon icon={faCircleUser}/>
                    <div className="user-text">
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>{user.role}</p>
                    </div>
                </button>

                <button className="nav-icon-button inv-button" onClick={() => {
                    userContext.setUser(null)
                    delete localStorage.authToken;
                }}>
                    <FontAwesomeIcon icon={faRightFromBracket}/>
                </button>
            </div>
        </div>
    </>;
}