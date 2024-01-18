import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActivities } from '../../store/reducers/board.reducer'
import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskActivityList } from './activity/TaskActivityList'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsActivity({ hierarchy }) {
    const { task } = hierarchy

    const [showDetails, toggleShowDetails] = useToggle()
    const activities = useSelector(selectActivities)
    const [taskActivities, setTaskActivities] = useState([])

    useEffect(() => {
        setTaskActivities(activities.filter((a) => a.taskId === task._id))
    }, [activities])

    return (
        <div className="task-details-activity">
            <TaskDetailsSubsectionHeader icon="activity" title="Activity">
                <SecondaryBtn
                    className="btn-title"
                    text={`${showDetails ? 'Hide' : 'Show'} details`}
                    onClick={() => toggleShowDetails()}
                ></SecondaryBtn>
            </TaskDetailsSubsectionHeader>
            <div className="content">
                <TaskActivityList
                    hierarchy={hierarchy}
                    activities={taskActivities}
                />
            </div>
        </div>
    )
}
