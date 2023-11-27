import { updateBoard } from '../../store/actions/board.actions'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { useToggle } from '../../customHooks/useToggle'
import { boardService } from '../../services/board.service'

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

    function onClick(e) {
        // add/remove the label in this task in the group in the board
        const boardClone = structuredClone(board)
        const taskClone = boardService.getTaskById(
            boardClone,
            group._id,
            task._id
        )

        if (isChecked) {
            // remove label from task
            taskClone.labelIds = taskClone.labelIds.filter(
                (lId) => lId !== label._id
            )
        } else {
            // add label to task
            taskClone.labelIds.push(label._id)
        }

        toggleIsChecked()
        updateBoard(boardClone)
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
