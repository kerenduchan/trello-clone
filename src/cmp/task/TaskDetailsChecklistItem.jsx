import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'

export function TaskDetailsChecklistItem({
    board,
    group,
    task,
    checklist,
    item,
}) {
    function onCheckboxClick() {
        const boardClone = deepClone(board)
        const groupClone = boardClone.groups.filter(
            (g) => g._id === group._id
        )[0]
        const taskClone = groupClone.tasks.filter((t) => t._id === task._id)[0]
        const checklistClone = taskClone.checklists.filter(
            (c) => c._id === checklist._id
        )[0]
        const itemClone = checklistClone.items.filter(
            (i) => i._id === item._id
        )[0]

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
