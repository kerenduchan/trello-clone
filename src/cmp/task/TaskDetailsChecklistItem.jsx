import { updateChecklistItem } from '../../store/actions/board.actions'

export function TaskDetailsChecklistItem({
    board,
    group,
    task,
    checklist,
    item,
}) {
    function onCheckboxClick() {
        try {
            updateChecklistItem(board, group, task, checklist, item, {
                isDone: !item.isDone,
            })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
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
