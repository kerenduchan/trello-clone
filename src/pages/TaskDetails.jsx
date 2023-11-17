export function TaskDetails({ task, onClose }) {
    return (
        <div className="task-details">
            <button onClick={onClose}>Close</button>
            task details
        </div>
    )
}
