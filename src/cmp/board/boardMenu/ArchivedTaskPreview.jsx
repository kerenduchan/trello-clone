export function ArchivedTaskPreview({ hierarchy, onUnarchive, onDelete }) {
    const { task } = hierarchy
    return (
        <div className="archived-task-preview">
            <div>{task.title}</div>
            <div className="actions">
                <button onClick={() => onUnarchive(hierarchy)}>
                    Send to board
                </button>
                <button onClick={() => onDelete(hierarchy)}>Delete</button>
            </div>
        </div>
    )
}
