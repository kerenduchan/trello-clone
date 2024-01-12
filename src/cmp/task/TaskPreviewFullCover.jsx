export function TaskPreviewFullCover({ hierarchy }) {
    const { task } = hierarchy
    const { cover } = task
    return (
        <div
            className="task-preview-full-cover"
            style={{
                backgroundColor: cover.bgColor.color,
                color: cover.textColor,
            }}
        >
            <div className="title">{task.title}</div>
        </div>
    )
}
