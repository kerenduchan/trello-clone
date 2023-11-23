import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskLabelsMenuItem({ label, isChecked }) {
    return (
        <div className="task-labels-menu-item">
            <input type="checkbox" />
            <div className="label" style={{ backgroundColor: label.color }}>
                {label.title}
            </div>
            <SquareIconBtn icon="edit" />
        </div>
    )
}
