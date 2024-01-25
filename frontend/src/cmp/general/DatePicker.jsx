import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatePicker({ datePicker, isSelectsRange, onChange }) {
    const { startDate, endDate } = datePicker

    function onChangeInternal(dates) {
        if (Array.isArray(dates)) {
            onChange(dates[0], dates[1])
        } else {
            onChange(dates, undefined)
        }
    }

    return (
        <div className="date-picker">
            <ReactDatePicker
                startDate={startDate}
                endDate={endDate}
                selected={startDate}
                onChange={onChangeInternal}
                selectsRange={isSelectsRange}
                inline
            />
        </div>
    )
}
