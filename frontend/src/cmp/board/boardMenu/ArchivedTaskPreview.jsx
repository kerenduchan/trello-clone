import { useLocation, useNavigate } from 'react-router'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'

export function ArchivedTaskPreview({ hierarchy, onUnarchive, onDelete }) {
    const { board, task } = hierarchy
    const location = useLocation()

    const navigate = useNavigate()
    const deleteTaskMenu = usePopoverState()

    function onTaskClick() {
        navigate(`/b/${board._id}/c/${task._id}${location.search}`)
    }

    return (
        <div className="archived-task-preview">
            <div className="card" onClick={onTaskClick}>
                <div className="title">{task.title}</div>
            </div>
            <div className="actions">
                <button onClick={() => onUnarchive(hierarchy)}>
                    Send to board
                </button>
                <p>•</p>
                <button {...deleteTaskMenu.triggerAndTarget}>Delete</button>
            </div>

            {/* Delete task menu */}
            {deleteTaskMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteTaskMenu}
                    title="Delete card?"
                    text="All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo."
                    onDelete={() => onDelete(hierarchy)}
                />
            )}
        </div>
    )
}
