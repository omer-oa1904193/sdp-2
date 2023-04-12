import styles from '@/styles/Home.module.css'
import {useState} from 'react'
import Dashboard from '../pages/dashboard/dashboard'

export default function Home() {
  const [isDashboard, setDashboard] = useState(true);
  const [isStudyPlan, setStudyPlan] = useState(true);
  return (
    <>
      {isDashboard ? (
        <Dashboard />
      ) : null}
    </>
  )
}
