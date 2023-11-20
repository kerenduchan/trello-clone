import { useState } from 'react'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { Icon } from '../general/Icon'
import { ProgressBar } from '../general/ProgressBar'

export function TaskDetailsActivity({ task }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="task-details-activity">
            <Icon type="activity" size="md" />
            <h2 className="title">Activity</h2>
            <ProgressBar percent={10} />
            <SecondaryBtn
                className="title-btn"
                text={`${showDetails ? 'Hide' : 'Show'} details`}
                onClick={() => setShowDetails((prev) => !prev)}
            ></SecondaryBtn>
        </div>
    )
}
