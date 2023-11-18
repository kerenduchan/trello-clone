import { SecondaryBtn } from './SecondaryBtn'

export function TaskDetailsDescription({ task }) {
    return (
        <div className="task-details-description">
            <div className="icon material-symbols-outlined">subject</div>
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
