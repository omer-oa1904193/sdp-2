import styles from "./CourseDesription.module.css"
import CourseInfo from "./CourseInfo.jsx"

function CourseDescription(){

    return <div className={styles.CourseDescription}>
        <div className={styles.header}>
            <div className={styles.courseName}>Course : xxxxx xxxxx</div>
        </div>
        <div className={styles.container}>
            <div className={styles.side}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Course Details</li>
                    <li className={styles.listItem}>Prerequistes</li>
                </ul>
            </div>
            <div className={styles.main}>
                <h2 className={styles.title}>Course Details</h2>
                <CourseInfo type="courseInfo" title="Title" data="Machine Learning"/>
                <CourseInfo type="courseInfo" title="College" data="Engineering"/>
                <CourseInfo type="courseInfo" title="Department" data="Computer Science and Engineering"/>
                <CourseInfo type="courseInfo" title="Course Fee" data="3000 QR"/>
                <div className={styles.creditHoursContainer}>
                    <div className={styles.heading}>Credit Hours</div>
                    <CourseInfo type="creditHours" title="Lecture" data="3"></CourseInfo>
                    <CourseInfo type="creditHours" title="Lab" data="0"></CourseInfo>

                </div>
                <h2 className={styles.title}>Course Description</h2>
                <div className={styles.description}>
                    Fundamental principles of machine learning, supervised learning, unsupervised learning, instance-based learning, decision tree induction, Bayesian inference, support vector machines, multi-layer neural networks, and performance evaluation of machine learning algorithms. Hands-on experience with implementing machine learning applications.
                </div>
            </div>
        </div>
    </div>
}

export default CourseDescription