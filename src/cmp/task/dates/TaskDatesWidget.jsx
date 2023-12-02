import moment from 'moment'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { TaskDatesMenu } from './TaskDatesMenu'
import { Icon } from '../../general/Icon'

export function TaskDatesWidget({ hierarchy }) {
    const { task } = hierarchy
    const dates = task.dates
    const datesMenu = usePopoverState()

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

    return (
        <>
            {hasDates() && (
                <section className="task-dates-widget">
                    <h3>{getTitle()}</h3>
                    <button {...datesMenu.triggerAndTarget}>
                        {getButtonText()}
                        <Icon type="expand_more" />
                    </button>
                </section>
            )}

            {/* Dates menu */}
            {datesMenu.show && (
                <TaskDatesMenu hierarchy={hierarchy} popoverState={datesMenu} />
            )}
        </>
    )
}
