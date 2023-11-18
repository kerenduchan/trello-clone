import { Icon } from './Icon'
import { SecondaryBtn } from './SecondaryBtn'

export function TaskDetailsDescription({ task }) {
    return (
        <div className="task-details-description">
            <Icon type="description" size="md" />
            <h2 className="title">Description</h2>

            {task.description ? (
                <p className="text">{task.description}</p>
            ) : (
                <SecondaryBtn
                    className="add-btn"
                    text="Add a more detailed description..."
                />
            )}
        </div>
    )
}
