export function ProgressBar({ percent }) {
    return (
        <div class="progress">
            <span class="label">{percent}</span>
            <div class="bar">
                <div class="completed" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}
