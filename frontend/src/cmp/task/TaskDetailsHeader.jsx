import { Icon } from '../general/Icon'
import { EditableTitle } from '../general/EditableTitle'
import { updateTask } from '../../store/actions/task/task.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { TaskMoveMenu } from './move/TaskMoveMenu'
import { TaskDetailsCover } from './cover/TaskDetailsCover'

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
            {/* Close button */}
            <button
                className="btn-circle btn-task-details-close"
                onClick={onClose}
            >
                <Icon type="close" />
            </button>

            {/* Task cover */}
            <TaskDetailsCover hierarchy={hierarchy} />

            {/* Archive banner */}
            {(task.archivedAt || group.archivedAt) && (
                <div className="archive-banner">
                    <Icon type="archive" size="md" />
                    <p>
                        {task.archivedAt
                            ? 'This card is archived.'
                            : 'This card is in an archived list'}
                    </p>
                </div>
            )}

            {/* Title, subtitle */}
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
