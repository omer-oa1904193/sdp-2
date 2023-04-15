import "./SummeryPane.css"
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {currencyFormatter} from "../../../../utils.js";

export function SummeryPane({studyPlan}) {
    return <>
        <div className="summery-pane">
            <div className="stats-div">
                <h3 className="stat-header">Summery</h3>
                <hr></hr>
                <h5 className="stat-header">Total Program Credit Hours</h5>
                <p className="stat-value">{studyPlan.program.creditHours}</p>
                <h5 className="stat-header">Total Program Courses</h5>
                <p className="stat-value">{studyPlan.program.courseCount}</p>
                <h5 className="stat-header">Total Planned Credit Hours</h5>
                <p className="stat-value">{studyPlan.stats.creditHours}</p>
                <h5 className="stat-header">Total Planned Courses</h5>
                <p className="stat-value">{studyPlan.stats.courses}</p>
                <h5 className="stat-header">Program Length</h5>
                <p className="stat-value">{studyPlan.years.length} years</p>
                <h5 className="stat-header">Total Tuition Fee</h5>
                <p className="stat-value">{currencyFormatter.format(studyPlan.stats.tuitionFees)}</p>
            </div>
            <div className="course-counts">
                        <span className="course-count-span">
                            <p>Total Completed Courses</p>
                            <p>{studyPlan.stats.completed}</p>
                        </span>
                <span className="course-count-span">
                            <p>Total Remaining Courses</p>
                            <p>{studyPlan.stats.remaining}</p>
                        </span>
            </div>
            <hr></hr>
            <div className="category-keys">
                <div className="category-key">
                    <div className="completed-course category-key-color"></div>
                    <p className="category-key-text">Completed Courses</p>
                </div>
                <div className="category-key">
                    <div className="major-course category-key-color"></div>
                    <p className="category-key-text">Major Courses</p>
                </div>
                <div className="category-key">
                    <div className="major-elective category-key-color"></div>
                    <p className="category-key-text">Major Electives</p>
                </div>
                <div className="category-key">
                    <div className="major-supporting category-key-color"></div>
                    <p className="category-key-text">Major Supporting Course</p>
                </div>
                <div className="category-key">
                    <div className="ccp-course category-key-color"></div>
                    <p className="category-key-text">CCP Courses</p>
                </div>
                <div className="category-key">
                    <div className="college-requirement category-key-color"></div>
                    <p className="category-key-text">College Requirements</p>
                </div>
                <div className="category-key">
                    <div className="has-prerequisites category-key-color">
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </div>
                    <p className="category-key-text">Has Prerequisite</p>
                </div>
                <div className="category-key">
                    <div className="category-key-color"></div>
                    <p className="category-key-text">Co-requisite</p>
                </div>
                <div className="category-key">
                    <div className="category-key-color"></div>
                    <p className="category-key-text">Prerequisite</p>
                </div>
            </div>
        </div>
    </>
}