//import './CourseDesription.css'
import styles from "./CourseDesription.module.css"

function CourseInfo(props){
    //type : (courseInfo/creditHours), for Styling purposes
    return <div className={props.type}>
        <div className={styles.infoTitle}>{props.title}</div>
        <div className={styles.infoData}>{props.data}</div>
        {/* <h4 className="infoTitle">{props.title}</h4>
        <h4 className="infoData">{props.data}</h4> */}
    </div>
}
export default CourseInfo

