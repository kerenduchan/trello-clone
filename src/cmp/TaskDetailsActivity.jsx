import { useState } from 'react'
import { SecondaryBtn } from './SecondaryBtn'

export function TaskDetailsActivity({ task }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="task-details-activity">
            <div className="icon material-symbols-outlined">list</div>
            <h2 className="title">Activity</h2>
            <SecondaryBtn
                className="title-btn"
                onClick={() => setShowDetails((prev) => !prev)}
            >
                {showDetails ? 'Hide' : 'Show'} details
            </SecondaryBtn>
        </div>
    )
}
