import { Icon } from '../general/Icon'
import { EditableTitle } from '../general/EditableTitle'
import { updateTask } from '../../store/actions/board.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { TaskMoveMenu } from './move/TaskMoveMenu'

export function TaskDetailsHeader({ hierarchy, onClose }) {
    const { group, task } = hierarchy
    const moveMenu = usePopoverState()

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

            {task.archivedAt && (
                <div className="archive-banner">
                    <Icon type="archived" size="md" />
                    <p>This card is archived.</p>
                </div>
            )}

            <div className="task-details-header">
                <div className="icon-container">
                    <Icon type="card" />
                </div>
                <EditableTitle title={task.title} onChange={onTitleChange} />
                <p className="subtitle">
                    in list{' '}
                    <span
                        className="group-title"
                        {...moveMenu.triggerAndTarget}
                    >
                        {group.title}
                    </span>
                </p>
            </div>

            {/* Move menu */}
            {moveMenu.show && (
                <TaskMoveMenu hierarchy={hierarchy} popoverState={moveMenu} />
            )}
        </>
    )
}
