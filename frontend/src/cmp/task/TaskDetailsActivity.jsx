import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTaskActivitiesWithUser } from '../../store/reducers/board.reducer'
import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskActivityList } from './activity/TaskActivityList'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsActivity({ hierarchy }) {
    const { task } = hierarchy

    const [showDetails, toggleShowDetails] = useToggle(true)
    const taskActivities = useSelector((state) =>
        selectTaskActivitiesWithUser(state, task._id)
    )
    const [filteredTaskActivities, setFilteredTaskActivities] = useState([])

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
