import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActivities } from '../../store/reducers/board.reducer'
import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskActivityList } from './activity/TaskActivityList'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsActivity({ hierarchy }) {
    const { board, task } = hierarchy

    const [showDetails, toggleShowDetails] = useToggle(true)
    const activities = useSelector(selectActivities)
    const [taskActivities, setTaskActivities] = useState([])
    const [filteredTaskActivities, setFilteredTaskActivities] = useState([])

    useEffect(() => {
        if (!activities) return

        // flesh out the task's activities, including the user
        const taskActivities = activities
            .filter((a) => a.taskId === task._id)
            .map((a) => ({
                ...a,
                user: board.members.find((m) => m._id === a.userId),
            }))
        setTaskActivities(taskActivities)
    }, [activities])

    useEffect(() => {
        let val = taskActivities
        if (!showDetails) {
            val = val.filter((a) => a.type === 'task-comment')
        }
        setFilteredTaskActivities(val)
    }, [showDetails, taskActivities])

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
                    activities={filteredTaskActivities}
                />
            </div>
        </div>
    )
}
