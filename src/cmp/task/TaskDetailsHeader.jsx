import { Icon } from '../general/Icon'
import { CircleBtn } from '../general/btn/CircleBtn'
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
            <CircleBtn
                type="close"
                className="task-details-close-btn"
                onClick={onClose}
            />
            {task.cover && (
                <div
                    className="cover"
                    style={{
                        backgroundColor: task.cover.bgColor,
                    }}
                ></div>
            )}

            <div className="task-details-header">
                <Icon type="card" />
                <EditableTitle title={task.title} onChange={onTitleChange} />
                <p className="subtitle">
                    in list <span className="group-title">{group.title}</span>
                </p>
            </div>
        </>
    )
}
