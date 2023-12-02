import moment from 'moment/moment'
import { useForm } from '../../../customHooks/useForm'
import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { useEffect } from 'react'

export function TaskDatesMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy
    const [draft, handleChange, setDraft] = useForm(convertTaskDateToDraft())

    useEffect(() => {
        setDraft(convertTaskDateToDraft())
    }, [task])

    function onSubmit(e) {
        e.preventDefault()
        const date = convertDraftToTaskDate()
        updateTask(hierarchy, { date })
    }

    function onRemove() {
        updateTask(hierarchy, { date: { startDate: null, endDate: null } })
    }

    function convertDraftToTaskDate() {
        return {
            startDate: draft.hasStartDate ? draft.startDate : null,
            endDate: draft.hasEndDate ? moment(draft.endDate).unix() : null,
        }
    }

    function convertTaskDateToDraft() {
        const res = {
            hasStartDate: false,
            startDate: '',
            hasEndDate: false,
            endDate: '',
        }

        if (task.date.startDate) {
            res.hasStartDate = true
            res.startDate = task.date.startDate
        }

        if (task.date.endDate) {
            res.hasEndDate = true
            res.endDate = moment
                .unix(task.date.endDate)
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
                    value={draft.startDate}
                    onChange={handleChange}
                />

                <h4>Due date</h4>
                <input
                    type="checkbox"
                    id="hasEndDate"
                    name="hasEndDate"
                    checked={draft.hasEndDate}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={draft.endDate}
                    onChange={handleChange}
                />
                <PrimaryBtn text="Save" />
                <SecondaryBtn text="Remove" onClick={onRemove} />
            </form>
        </PopoverMenu>
    )
}
