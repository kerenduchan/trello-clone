import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsDescription({ task }) {
    return (
        <div className="task-details-description">
            <TaskDetailsSubsectionHeader icon="description" title="Description">
                {task.description && (
                    <SecondaryBtn className="title-btn" text="Edit" />
                )}
            </TaskDetailsSubsectionHeader>

            <div className="content">
                {task.description ? (
                    <p className="text">{task.description}</p>
                ) : (
                    <SecondaryBtn
                        className="add-btn"
                        text="Add a more detailed description..."
                    />
                )}
            </div>
        </div>
    )
}
