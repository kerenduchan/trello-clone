export function TaskDetailsDescription({ task }) {
    return (
        <div className="task-details-description">
            <div className="icon material-symbols-outlined">subject</div>
            <h2 className="title">Description</h2>
            <p className="text">{task.description}</p>
        </div>
    )
}
