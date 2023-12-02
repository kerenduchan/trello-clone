import { Icon } from '../general/Icon'
import { EditableTitle } from '../general/EditableTitle'
import { updateTask } from '../../store/actions/board.actions'

export function TaskDetailsHeader({ hierarchy, onClose }) {
    const { group, task } = hierarchy

    function onTitleChange(title) {
        try {
            updateTask(hierarchy, { title })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <>
            <button
                className="btn-circle btn-task-details-close"
                onClick={onClose}
            >
                <Icon type="close" />
            </button>
            {task.cover && (
                <div
                    className="cover"
                    style={{
                        backgroundColor: task.cover.bgColor,
                    }}
                ></div>
            )}

            <div className="task-details-header">
                <div className="icon-container">
                    <Icon type="card" />
                </div>
                <EditableTitle title={task.title} onChange={onTitleChange} />
                <p className="subtitle">
                    in list <span className="group-title">{group.title}</span>
                </p>
            </div>
        </>
    )
}
