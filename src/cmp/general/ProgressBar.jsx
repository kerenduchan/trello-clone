import { buildClassName } from '../../util'

export function ProgressBar({ percent }) {
    return (
        <div className="progress-bar">
            <span className="label">{percent}</span>
            <div className="bar">
                <div
                    className={buildClassName(
                        'completed-part',
                        percent === 100 && 'fully-complete'
                    )}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    )
}
