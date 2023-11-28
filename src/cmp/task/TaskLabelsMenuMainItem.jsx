import {
    removeTaskLabel,
    addTaskLabel,
} from '../../store/actions/board.actions'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { useToggle } from '../../customHooks/useToggle'

export function TaskLabelsMenuMainItem({
    board,
    group,
    task,
    label,
    onEditClick,
}) {
    const [isChecked, toggleIsChecked] = useToggle(
        task.labelIds.includes(label._id)
    )

    function onClick() {
        try {
            if (isChecked) {
                // remove label from task
                removeTaskLabel(board, group, task, label)
            } else {
                // add label to task
                addTaskLabel(board, group, task, label)
            }
            toggleIsChecked()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="task-labels-menu-item">
            <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onClick}
            />
            <div
                className="label"
                style={{ backgroundColor: label.color }}
                onClick={onClick}
            >
                {label.title}
            </div>
            <SquareIconBtn icon="edit" onClick={() => onEditClick(label)} />
        </div>
    )
}
