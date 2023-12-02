import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskComments } from './comments/TaskComments'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsActivity({ hierarchy }) {
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
            <div className="content">
                <TaskComments hierarchy={hierarchy} />
            </div>
        </div>
    )
}
