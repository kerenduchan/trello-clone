export function TaskDetails({ task, onClose }) {
    return (
        <div className="task-details-bg">
            <div className="task-details">
                <button className="circle-btn close-btn" onClick={onClose}>
                    <img src="images/close.svg" alt="close" />
                </button>
                <h1 className="title">{task.title}</h1>
            </div>
        </div>
    )
}
