import moment from 'moment/moment'
import { useForm } from '../../../customHooks/useForm'
import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
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
        updateTask(hierarchy, { dates: null })
        popoverState.onClose()
    }

    function convertDraftToTaskDates() {
        if (!draft.hasStartDate && !draft.hasDueDate) {
            return null
        }

        return {
            startDate: draft.hasStartDate ? draft.startDate : null,
            dueDate: draft.hasDueDate ? moment(draft.dueDate).unix() : null,
            isComplete: Boolean(draft.hasDueDate && task.dates?.isComplete),
        }
    }

    function convertTaskDatesToDraft() {
        const res = {
            hasStartDate: false,
            startDate: '',
            hasDueDate: false,
            dueDate: '',
        }

        if (task.dates?.startDate) {
            res.hasStartDate = true
            res.startDate = task.dates.startDate
        }

        if (task.dates?.dueDate) {
            res.hasDueDate = true
            res.dueDate = moment
                .unix(task.dates.dueDate)
                .format('YYYY-MM-DDTHH:mm')
        }
        return res
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
                <button className="btn-primary btn-save">Save</button>
                <SecondaryBtn
                    className="btn-remove"
                    text="Remove"
                    onClick={onRemove}
                />
            </form>
        </PopoverMenu>
    )
}
