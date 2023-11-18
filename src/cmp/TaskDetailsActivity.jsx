import { useState } from 'react'
import { SecondaryBtn } from './SecondaryBtn'
import { Icon } from './Icon'

export function TaskDetailsActivity({ task }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="task-details-activity">
            <Icon type="activity" size="md" />
            <h2 className="title">Activity</h2>
            <SecondaryBtn
                className="title-btn"
                text={`${showDetails ? 'Hide' : 'Show'} details`}
                onClick={() => setShowDetails((prev) => !prev)}
            ></SecondaryBtn>
        </div>
    )
}
