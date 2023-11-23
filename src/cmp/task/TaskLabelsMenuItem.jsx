import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskLabelsMenuItem({ board, task, label }) {
    function onCheckboxChange(e) {
        if (e.target.checked) {
            // add label to task
            //task.labelIds = [...task.labelIds, label._id]
        } else {
        }
    }

    return (
        <div className="task-labels-menu-item">
            <input
                className="checkbox"
                type="checkbox"
                onChange={onCheckboxChange}
            />
            <div className="label" style={{ backgroundColor: label.color }}>
                {label.title}
            </div>
            <SquareIconBtn icon="edit" />
        </div>
    )
}
