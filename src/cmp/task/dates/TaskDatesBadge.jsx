import { useEffect } from 'react'
import { updateTask } from '../../../store/actions/board.actions'
import { useToggle } from '../../../customHooks/useToggle'
import moment from 'moment/moment'
import { Icon } from '../../general/Icon'
import { boardService } from '../../../services/board.service'

export function TaskDatesBadge({ hierarchy }) {
    const { task } = hierarchy

    const [isComplete, toggleIsComplete, setIsComplete] = useToggle(
        task.dates?.isComplete
    )

    useEffect(() => {
        setIsComplete(task.dates?.isComplete || false)
    }, [task])

    function onClick(e) {
        e.stopPropagation()

        updateTask(hierarchy, {
            dates: { ...task.dates, isComplete: !isComplete },
        })
        toggleIsComplete()
    }

    const status = boardService.getTaskDateStatus(task)

    if (!task.dates || !task.dates.dueDate) return <></>

    return (
        <div
            className={`task-dates-badge ${status ? status.className : ''}`}
            onClick={onClick}
        >
            <span className="icon-container">
                <Icon type="schedule" size="xs" />
                <Icon
                    className="checkbox-icon"
                    type={
                        isComplete ? 'checkbox-checked' : 'checkbox-unchecked'
                    }
                    size="xs"
                />
            </span>
            <span className="due-date">
                {moment(task.dates.dueDate).format('MMM DD')}
            </span>
        </div>
    )
}
