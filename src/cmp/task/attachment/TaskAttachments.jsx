import { usePopoverState } from '../../../customHooks/usePopoverState'
import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { TaskAttachment } from './TaskAttachment'
import { TaskAttachmentMenu } from './TaskAttachmentMenu'

export function TaskAttachments({ hierarchy }) {
    const { task } = hierarchy

    const addMenu = usePopoverState()

    if (!task.attachments || task.attachments.length === 0) {
        return <></>
    }

    return (
        <div className="task-attachments">
            <TaskDetailsSubsectionHeader icon="attachment" title="Attachments">
                <button
                    className="btn-secondary-centered btn-add"
                    {...addMenu.triggerAndTarget}
                >
                    Add
                </button>
            </TaskDetailsSubsectionHeader>
            <div className="content">
                <ul>
                    {task.attachments.map((attachment) => (
                        <li className="attachment" key={attachment._id}>
                            <TaskAttachment
                                hierarchy={hierarchy}
                                attachment={attachment}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add attachment menu */}
            {addMenu.show && (
                <TaskAttachmentMenu
                    hierarchy={hierarchy}
                    popoverState={addMenu}
                />
            )}
        </div>
    )
}
