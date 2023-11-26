import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { Icon } from '../general/Icon'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsActivity({ task }) {
    const [showDetails, toggleShowDetails] = useToggle()

    return (
        <div className="task-details-activity">
            <TaskDetailsSubsectionHeader icon="activity" title="Activity">
                <SecondaryBtn
                    className="title-btn"
                    text={`${showDetails ? 'Hide' : 'Show'} details`}
                    onClick={() => toggleShowDetails()}
                ></SecondaryBtn>
            </TaskDetailsSubsectionHeader>
            <div className="content"></div>
        </div>
    )
}
