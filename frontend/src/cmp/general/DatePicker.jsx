import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatePicker({ datePicker, onChange }) {
    console.log('DatePicker', datePicker)
    const { startDate, endDate, isSelectsRange } = datePicker

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
