export function TaskPreviewFullCover({ hierarchy }) {
    const { task } = hierarchy

    function getStyle() {
        const { cover } = task

        if (cover.bgColor) {
            return {
                backgroundColor: cover.bgColor.color,
                color: cover.textColor,
            }
        }

        return {
            backgroundImage: `url("${cover.bgImage.url}")`,
        }
    }

    return (
        <div className="task-preview-full-cover" style={getStyle()}>
            <div className="title-container">
                <div className="title" style={{ color: '#ffffff' }}>
                    {task.title}
                </div>
            </div>
        </div>
    )
}
