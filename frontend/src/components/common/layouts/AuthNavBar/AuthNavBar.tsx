import Link from "next/link";
import { useRouter } from "next/router";
import { faBell, faCircleUser, faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import "src/components/common/layouts/AuthNavBar/AuthNavBar.css";
import { UserContext } from "../../../../contexts/UserContext.js";

export function AuthNavBar() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const user = userContext.user;

  return (
    <div className="auth-navbar">
      <div className="nav-links">
        <button className="home-button inv-button link-button">
          <Link href="/dashboard">
            <a className={`${router.pathname === "/dashboard" ? "current-tab" : ""}`}>
              <FontAwesomeIcon icon={faHouse} />
            </a>
          </Link>
        </button>

        <nav>
          <ul>
            <li>
              <Link href={`/student/study-plans/${user?.currentStudyPlan}`}>
                <a className={`${router.pathname === "/student/study-plans/[studyPlanId]" ? "current-tab" : ""}`}>
                  Study Plan
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="nav-user">
        {/*<button className="nav-icon-button inv-button">
          <FontAwesomeIcon icon={faBell}/>
        </button>*/}
        
        <div className="divider"></div>
        {user ? (
          <button className="user-profile inv-button">
            <FontAwesomeIcon icon={faCircleUser} />
            <div className="user-text">
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.role}</p>
            </div>
          </button>
        ) : null}

        {user ? (
          <button className="nav-icon-button inv-button" onClick={() => {
            userContext.setUser(null)
            delete localStorage.authToken;
          }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
