export function TaskPreviewCover({ hierarchy }) {
    const { task } = hierarchy

    if (!task.cover) return <></>

    return (
        <div
            className="task-preview-cover"
            style={{
                backgroundColor: task.cover.bgColor.color,
            }}
        ></div>
    )
}
