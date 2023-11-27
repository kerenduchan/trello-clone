import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'

export function TaskDetailsChecklistItem({
    board,
    group,
    task,
    checklist,
    item,
}) {
    function onCheckboxClick() {
        const boardClone = structuredClone(board)
        const itemClone = boardService.getChecklistItemById(
            boardClone,
            group._id,
            task._id,
            checklist._id,
            item._id
        )
        itemClone.isDone = !itemClone.isDone
        updateBoard(boardClone)
    }

    return (
        <div className="task-details-checklist-item">
            <input
                className="checkbox"
                type="checkbox"
                checked={item.isDone}
                onChange={onCheckboxClick}
            />
            <span className={`title ${item.isDone ? 'done' : ''}`}>
                {item.title}
            </span>
        </div>
    )
}
