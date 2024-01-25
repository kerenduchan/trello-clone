import moment from 'moment/moment'
import { useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { updateTask } from '../../../store/actions/task/task.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { DatePicker } from '../../general/DatePicker'

export function TaskDatesMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy

    // For checkboxes (boolean values) and text input fields (string values)
    const [draft, handleChange, setDraft] = useForm({
        hasStartDate: false,
        startDate: '',
        hasDueDate: false,
        dueDate: '',
    })

    // The date picker. startDate and endDate are Date objects
    const [datePicker, setDatePicker] = useState({
        startDate: null,
        endDate: null,
    })

    function isSelectsRange() {
        return draft.hasStartDate && draft.hasDueDate
    }

    function onDatePickerChange(start, end) {
        console.log('onDatePickerChange', start, end)

        if (!draft.hasStartDate) {
            // doesn't have start date
            setDraft((prev) => ({
                ...prev,
                hasDueDate: true,
                dueDate: convertDateToText(start),
            }))
        } else if (!draft.hasDueDate) {
            // has start date and doesn't have due date
            setDraft((prev) => ({
                ...prev,
                startDate: convertDateToText(start),
            }))
        } else {
            // has both start and due date
            setDraft((prev) => ({
                ...prev,
                startDate: convertDateToText(start),
                dueDate: end ? convertDateToText(end) : prev.dueDate,
            }))
        }

        setDatePicker({
            startDate: start,
            endDate: end,
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        // const dates = convertDraftToTaskDates()
        // updateTask(hierarchy, { dates })
        popoverState.onClose()
    }

    function onRemove() {
        updateTask(hierarchy, { dates: null })
        popoverState.onClose()
    }

    function convertDateToText(date) {
        return moment(date).format('DD/MM/YYYY')
    }

    return (
        <PopoverMenu
            className="task-dates-menu"
            title="Dates"
            {...popoverState.popover}
        >
            {/* Date picker */}
            <DatePicker
                datePicker={datePicker}
                isSelectsRange={isSelectsRange()}
                onChange={onDatePickerChange}
            />

            <form onSubmit={onSubmit}>
                <div className="date-container">
                    {/* Start date */}
                    <h4>Start date</h4>
                    <input
                        className="date-checkbox"
                        type="checkbox"
                        id="hasStartDate"
                        name="hasStartDate"
                        checked={draft.hasStartDate}
                        onChange={handleChange}
                    />
                    <input
                        className="date-input"
                        type="text"
                        id="startDate"
                        name="startDate"
                        disabled={!draft.hasStartDate}
                        value={
                            draft.hasStartDate ? draft.startDate : 'DD/MM/YYYY'
                        }
                        onChange={handleChange}
                    />
                </div>

                {/* Due date */}
                <div className="date-container">
                    <h4>Due date</h4>
                    <input
                        className="date-checkbox"
                        type="checkbox"
                        id="hasDueDate"
                        name="hasDueDate"
                        checked={draft.hasDueDate}
                        onChange={handleChange}
                    />
                    <input
                        className="date-input"
                        type="text"
                        id="dueDate"
                        name="dueDate"
                        disabled={!draft.hasDueDate}
                        value={draft.hasDueDate ? draft.dueDate : 'DD/MM/YYYY'}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn-primary btn-save">Save</button>
                <button
                    type="button"
                    className="btn-secondary-centered btn-remove"
                    onClick={onRemove}
                >
                    Remove
                </button>
            </form>
        </PopoverMenu>
    )
}
