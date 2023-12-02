import moment from 'moment/moment'
import { useForm } from '../../../customHooks/useForm'
import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { useEffect } from 'react'

export function TaskDatesMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy
    const [draft, handleChange, setDraft] = useForm(convertTaskDatesToDraft())

    useEffect(() => {
        setDraft(convertTaskDatesToDraft())
    }, [task])

    function onSubmit(e) {
        e.preventDefault()
        const dates = convertDraftToTaskDates()
        updateTask(hierarchy, { dates })
        popoverState.onClose()
    }

    function onRemove() {
        updateTask(hierarchy, { dates: { startDate: null, dueDate: null } })
        popoverState.onClose()
    }

    function convertDraftToTaskDates() {
        return {
            startDate: draft.hasStartDate ? draft.startDate : null,
            dueDate: draft.hasDueDate ? moment(draft.dueDate).unix() : null,
        }
    }

    function convertTaskDatesToDraft() {
        const res = {
            hasStartDate: false,
            startDate: '',
            hasDueDate: false,
            dueDate: '',
        }

        if (task.dates.startDate) {
            res.hasStartDate = true
            res.startDate = task.dates.startDate
        }

        if (task.dates.dueDate) {
            res.hasDueDate = true
            res.dueDate = moment
                .unix(task.dates.dueDate)
                .format('YYYY-MM-DDTHH:mm')
        }
        console.log('convertTaskDatesToDraft', task.dates, res)
        return res
    }

    function isStartDateDisabled() {
        return draft.hasStartDate === false
    }

    return (
        <PopoverMenu
            className="task-dates-menu"
            title="Dates"
            {...popoverState.popover}
        >
            <h4>Start date</h4>

            <form onSubmit={onSubmit}>
                <input
                    type="checkbox"
                    id="hasStartDate"
                    name="hasStartDate"
                    checked={draft.hasStartDate}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    disabled={!draft.hasStartDate}
                    value={draft.startDate}
                    onChange={handleChange}
                />

                <h4>Due date</h4>
                <input
                    type="checkbox"
                    id="hasDueDate"
                    name="hasDueDate"
                    checked={draft.hasDueDate}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    id="dueDate"
                    name="dueDate"
                    disabled={!draft.hasDueDate}
                    value={draft.dueDate}
                    onChange={handleChange}
                />
                <PrimaryBtn text="Save" />
                <SecondaryBtn text="Remove" onClick={onRemove} />
            </form>
        </PopoverMenu>
    )
}
