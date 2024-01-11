import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { TaskAttachment } from './TaskAttachment'

export function TaskAttachments({ hierarchy }) {
    const { task } = hierarchy

    if (!task.attachments || task.attachments.length === 0) {
        return <></>
    }

    return (
        <div className="task-attachments">
            <TaskDetailsSubsectionHeader icon="attachment" title="Attachments">
                <button className="btn-secondary-centered btn-add">Add</button>
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
        </div>
    )
}
