export function ProgressBar({ percent }) {
    return (
        <div className="progress-bar">
            <span className="label">{percent}</span>
            <div className="bar">
                <div
                    className="completed"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    )
}
