import moment from 'moment/moment'
import { Icon } from '../../general/Icon'

export function TaskDatesBadge({ hierarchy }) {
    const { task } = hierarchy

    if (!task.dates || !task.dates.dueDate) return <></>

    return (
        <div className="task-dates-badge">
            <span className="icon-container">
                <Icon type="schedule" size="xs" />
                <Icon
                    className="checkbox-icon"
                    type="checkbox-unchecked"
                    size="xs"
                />
            </span>
            <span className="due-date">
                {moment(task.dates.dueDate).format('MMM DD')}
            </span>
        </div>
    )
}
