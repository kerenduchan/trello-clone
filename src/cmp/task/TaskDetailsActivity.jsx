import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { Icon } from '../general/Icon'
import { ProgressBar } from '../general/ProgressBar'

export function TaskDetailsActivity({ task }) {
    const [showDetails, toggleShowDetails] = useToggle()

    return (
        <div className="task-details-activity">
            <Icon type="activity" size="md" />
            <h2 className="title">Activity</h2>
            <ProgressBar percent={10} />
            <SecondaryBtn
                className="title-btn"
                text={`${showDetails ? 'Hide' : 'Show'} details`}
                onClick={() => toggleShowDetails()}
            ></SecondaryBtn>
        </div>
    )
}
