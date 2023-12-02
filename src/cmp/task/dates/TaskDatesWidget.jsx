import moment from 'moment'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { TaskDatesMenu } from './TaskDatesMenu'

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

    function getStartDate() {
        // TODO: different format if not in the current year
        return moment(dates.startDate).format('MMM DD')
    }

    return (
        <>
            {hasDates() && (
                <section className="task-dates-widget">
                    <h3>{getTitle()}</h3>
                    <button {...datesMenu.triggerAndTarget}>
                        {getStartDate()}
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
