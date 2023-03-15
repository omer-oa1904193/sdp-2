import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React from 'react';

import styles from "./DashBoardPage.module.css"

export default function DashBoard() {
  return <>
    <div className={styles['dashboard-page']}>
            <h1>Welcome</h1>
            <button onClick={() => (true)} className="main-button add-study-plan-button">
                <FontAwesomeIcon icon={faPlus}/>New Study Plan
            </button>
            <section className="study-plans">
            <h2>Study Plans</h2>
            </section>
        </div>
  </>
}
