import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatePicker({ startDate, endDate, onChange }) {
    return (
        <div className="date-picker">
            <ReactDatePicker
                startDate={startDate}
                endDate={endDate}
                selected={startDate}
                onChange={onChange}
                selectsRange
                inline
            />
        </div>
    )
}
