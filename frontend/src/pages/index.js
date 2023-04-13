import styles from '@/styles/Home.module.css'
import {useState} from 'react'
import DashboardPage from './dashboard/index.jsx'

export default function Home() {
  const [isDashboard, setDashboard] = useState(true);
  const [isStudyPlan, setStudyPlan] = useState(true);
  return (
    <>
      {isDashboard ? (
        <DashboardPage />
      ) : null}
    </>
  )
}
