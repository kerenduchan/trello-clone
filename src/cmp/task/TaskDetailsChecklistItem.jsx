export function TaskDetailsChecklistItem({ item }) {
    return (
        <div className="task-details-checklist-item">
            <input
                className="checkbox"
                type="checkbox"
                checked={item.isDone}
                onChange={() => {}}
            />
            <span className={`title ${item.isDone ? 'done' : ''}`}>
                {item.title}
            </span>
        </div>
    )
}
