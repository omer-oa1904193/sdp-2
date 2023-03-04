import "./ProgressBar.css"

export function ProgressBar({progress}) {
    return <>
        <div className="progress-bar">
            <div className="filled" style={{flexGrow: progress}}></div>
            <div className="empty" style={{flexGrow: 100 - progress}}></div>
        </div>
    </>

}