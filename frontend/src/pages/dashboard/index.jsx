import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

import styles from "./DashBoardPage.module.css"

export default function DashBoard() {
  return <>
    <div className={styles['dashboard-page']}>
      <section>
        <h1>Welcome</h1>
      </section>
  

      <section className="study-plans">
        <button onClick={() => (true)} className="main-button add-study-plan-button">
          <FontAwesomeIcon icon={faPlus} />New Study Plan
        </button>
        <h2>Study Plans</h2>
      </section>
    </div>
  </>
}
