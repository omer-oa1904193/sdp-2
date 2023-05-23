import styles from "./GPAVisualizer.module.css"

export function GPAVisualizer({gpa}) {
    //from https://stackoverflow.com/a/68489726/14200676
    return <div className={styles.wrapper}>
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             viewBox="37 -5 120 100" width="120" height="100">
            <path className={`${styles.svgPath} ${styles.empty}`} d="M55,90
               A55,55 0 1,1 140,90"
                  style={{fill: "none"}}/>
            <path className={`${styles.svgPath} ${styles.filled}`}
                  d="M55,90 A55,55 0 1,1 140,90"
                  style={{
                      fill: "none",
                      strokeDashoffset: 250 - (gpa / 4) * 250,
                      stroke: `var(${getGPAColor(gpa)})`,
                  }}/>
            <text className={`${styles.gpaText}`}
                  x="95" y="95"
                  textAnchor="middle"
                  style={{
                      fill: `var(${getGPAColor(gpa)})`,
                  }}>
                {Number(gpa).toFixed(2)}
            </text>

        </svg>
        <p className={`${styles.gpaLabel}`}>GPA</p>
    </div>
}

function getGPAColor(gpa) {
    if (gpa <= 2.0)
        return "--low-color";
    else if (gpa <= 3.0)
        return "--mid-color";
    else
        return "--high-color";
}
