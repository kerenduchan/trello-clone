import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskLabelsMenuItem({ board, group, task, label }) {
    function onCheckboxChange(e) {
        // add/remove the label in this task in the group in the board
        const boardClone = deepClone(board)
        const groupClone = boardClone.groups.filter(
            (g) => g._id === group._id
        )[0]
        const taskClone = groupClone.tasks.filter((t) => t._id === task._id)[0]

        if (e.target.checked) {
            // add label to task
            taskClone.labelIds.push(label._id)
        } else {
            taskClone.labelIds = taskClone.labelIds.filter(
                (lId) => lId !== label._id
            )
        }
        updateBoard(boardClone)
    }

    return (
        <div className="task-labels-menu-item">
            <input
                className="checkbox"
                type="checkbox"
                checked={task.labelIds.includes(label._id)}
                onChange={onCheckboxChange}
            />
            <div className="label" style={{ backgroundColor: label.color }}>
                {label.title}
            </div>
            <SquareIconBtn icon="edit" />
        </div>
    )
}
