import moment from 'moment'
import { useEffect, useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { updateTask } from '../../../store/actions/task/task.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { DatePicker } from '../../general/DatePicker'

const DATE_STR_FORMAT = 'DD/MM/YYYY'

export function TaskDatesMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy

    // For checkboxes (boolean values) and text input fields (string values)
    const [draft, handleChange, setDraft] = useForm(convertTaskDatesToDraft())

    // The date picker. startDate and endDate are Date objects
    const [datePicker, setDatePicker] = useState(convertDraftToDatePicker())

    useEffect(() => {
        setDraft(convertTaskDatesToDraft())
    }, [task])

    function onDatePickerChange(start, end) {
        if (!draft.hasStartDate) {
            // doesn't have start date
            setDraft((prev) => ({
                ...prev,
                hasDueDate: true,
                dueDate: convertDateToStr(start),
            }))
        } else if (!draft.hasDueDate) {
            // has start date and doesn't have due date
            setDraft((prev) => ({
                ...prev,
                startDate: convertDateToStr(start),
            }))
        } else {
            // has both start and due date
            setDraft((prev) => ({
                ...prev,
                startDate: convertDateToStr(start),
                dueDate: end ? convertDateToStr(end) : prev.dueDate,
            }))
        }

        setDatePicker({
            startDate: start,
            endDate: end,
        })
    }

    function onDateInputBlur(e) {
        const val = e.target.value
        console.log(isDateValid(val))
        if (!isDateValid(val)) {
            setDraft(convertTaskDatesToDraft())
            return
        }
        setDatePicker(convertDraftToDatePicker())
    }

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
            dueDate: draft.hasDueDate
                ? moment(draft.dueDate, DATE_STR_FORMAT).unix()
                : null,
            isComplete: Boolean(draft.hasDueDate && task.dates?.isComplete),
        }
    }

    function convertDraftToDatePicker() {
        const { hasStartDate, startDate, hasDueDate, dueDate } = draft
        return {
            startDate: hasStartDate ? convertStrToDate(startDate) : null,
            endDate: hasDueDate ? convertStrToDate(dueDate) : null,
        }
    }

    function isSelectsRange() {
        return draft.hasStartDate && draft.hasDueDate
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
            res.dueDate = moment.unix(task.dates.dueDate).format('DD/MM/YYYY')
        }
        return res
    }

    function convertDateToStr(date) {
        return moment(date).format(DATE_STR_FORMAT)
    }

    function convertStrToDate(date) {
        if (!date) {
            return null
        }
        return moment(date, DATE_STR_FORMAT).toDate()
    }

    function isDateValid(dateString) {
        // The "true" flag enables strict parsing
        const parsedDate = moment(dateString, DATE_STR_FORMAT, true)
        return parsedDate.isValid()
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
                        placeholder="DD/MM/YYYY"
                        disabled={!draft.hasStartDate}
                        value={
                            draft.hasStartDate
                                ? draft.startDate
                                : DATE_STR_FORMAT
                        }
                        onChange={handleChange}
                        onBlur={onDateInputBlur}
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
                        placeholder="DD/MM/YYYY"
                        disabled={!draft.hasDueDate}
                        value={
                            draft.hasDueDate ? draft.dueDate : DATE_STR_FORMAT
                        }
                        onChange={handleChange}
                        onBlur={onDateInputBlur}
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
