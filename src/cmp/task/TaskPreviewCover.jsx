export function TaskPreviewCover({ task }) {
    if (!task.cover) return <></>

    return (
        <div
            className="task-preview-cover"
            style={{
                backgroundColor: task.cover.bgColor,
            }}
        ></div>
    )
}
