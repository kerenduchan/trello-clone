import { useEffect } from 'react'
import moment from 'moment'
import { useToggle } from '../../../customHooks/useToggle'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { TaskDatesMenu } from './TaskDatesMenu'
import { Icon } from '../../general/Icon'
import { updateTask } from '../../../store/actions/board.actions'
import { boardService } from '../../../services/board.service'

export function TaskDatesWidget({ hierarchy }) {
    const { task } = hierarchy
    const dates = task.dates
    const [isComplete, toggleIsComplete, setIsComplete] = useToggle(
        dates?.isComplete || false
    )

    const datesMenu = usePopoverState()

    useEffect(() => {
        setIsComplete(dates?.isComplete || false)
    }, [task])

    function onCheckboxChange() {
        toggleIsComplete()
        updateTask(hierarchy, {
            dates: { ...task.dates, isComplete: !isComplete },
        })
    }

    function hasDates() {
        return Boolean(dates && (dates.startDate || dates.dueDate))
    }

    function getTitle() {
        if (dates.startDate) {
            if (dates.dueDate) {
                return 'Dates'
            } else {
                return 'Start Date'
            }
        }
        return 'Due Date'
    }

    function getButtonText() {
        // TODO: different format if not in the current year
        let res = ''
        if (dates.startDate) {
            res += moment(dates.startDate).format('MMM DD')
            if (dates.dueDate) {
                res += ' - '
            }
        }
        if (dates.dueDate) {
            res += moment.unix(task.dates.dueDate).format('MMM DD [at] HH:mm A')
        }
        return res
    }

    const status = boardService.getTaskDateStatus(task)

    return (
        <>
            {hasDates() && (
                <section className="task-dates-widget">
                    <h3>{getTitle()}</h3>
                    <div className="content">
                        {dates.dueDate && (
                            <input
                                className="is-complete-checkbox"
                                type="checkbox"
                                name="isComplete"
                                id="isComplete"
                                checked={isComplete}
                                onChange={onCheckboxChange}
                            />
                        )}
                        <button {...datesMenu.triggerAndTarget}>
                            <span>{getButtonText()}</span>
                            {status && (
                                <span
                                    className={`status-label ${status.className}`}
                                >
                                    {status.text}
                                </span>
                            )}
                            <Icon type="expand_more" />
                        </button>
                    </div>
                </section>
            )}

            {/* Dates menu */}
            {datesMenu.show && (
                <TaskDatesMenu hierarchy={hierarchy} popoverState={datesMenu} />
            )}
        </>
    )
}
