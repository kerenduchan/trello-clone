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

    return (
        <>
            {hasDates() && (
                <section className="task-dates-widget">
                    <h3>{getTitle()}</h3>
                </section>
            )}

            {/* Dates menu */}
            {datesMenu.show && (
                <TaskDatesMenu hierarchy={hierarchy} popoverState={datesMenu} />
            )}
        </>
    )
}
