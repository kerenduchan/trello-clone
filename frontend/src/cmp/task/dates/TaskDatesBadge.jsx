import { useEffect } from 'react'
import { updateTask } from '../../../store/actions/task/task.actions'
import { useToggle } from '../../../customHooks/useToggle'
import moment from 'moment/moment'
import { Icon } from '../../general/Icon'
import { boardService } from '../../../services/board/board.service'

export function TaskDatesBadge({ hierarchy }) {
    const { task } = hierarchy
    const dates = task.dates

    const [isComplete, toggleIsComplete, setIsComplete] = useToggle(
        dates?.isComplete
    )

    useEffect(() => {
        setIsComplete(dates?.isComplete || false)
    }, [task])

    function onClick(e) {
        if (!isAllowComplete()) {
            return
        }

        e.stopPropagation()

        updateTask(hierarchy, {
            dates: { ...dates, isComplete: !isComplete },
        })
        toggleIsComplete()
    }

    function getText() {
        // TODO: different format if not in the current year

        let res = ''
        if (dates.startDate) {
            if (!dates.dueDate) {
                res += 'Started: '
            }
            res += moment(dates.startDate, 'DD/MM/YYYY').format('MMM DD')
            if (dates.dueDate) {
                res += ' - '
            }
        }
        if (dates.dueDate) {
            res += moment.unix(task.dates.dueDate).format('MMM DD')
        }
        return res
    }

    function isAllowComplete() {
        return Boolean(dates.dueDate)
    }

    const status = boardService.getTaskDateStatus(task)

    if (!dates || (!dates.dueDate && !dates.startDate)) return <></>

    return (
        <div
            className={`task-dates-badge ${status ? status.className : ''}`}
            onClick={onClick}
        >
            <span
                className={`icon-container ${
                    isAllowComplete() ? 'show-checkbox-on-hover' : ''
                }`}
            >
                <Icon type="schedule" size="xs" />

                <Icon
                    className="checkbox-icon"
                    type={
                        isComplete ? 'checkbox-checked' : 'checkbox-unchecked'
                    }
                    size="xs"
                />
            </span>
            <span className="due-date">{getText()}</span>
        </div>
    )
}
