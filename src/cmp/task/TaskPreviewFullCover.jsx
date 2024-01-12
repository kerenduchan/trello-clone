export function TaskPreviewFullCover({ hierarchy }) {
    const { task } = hierarchy
    const { cover } = task

    function getStyle() {
        if (cover.bgColor) {
            return {
                backgroundColor: cover.bgColor.color,
                color: cover.bgColor.textColor,
            }
        }

        return {
            backgroundImage: `url("${cover.bgImage.url}")`,
        }
    }

    function getGradientClass() {
        if (cover.bgColor) {
            return {}
        }

        return `gradient-${
            cover.bgImage.textColor === 'light' ? 'dark' : 'light'
        }`
    }

    return (
        <div className="task-preview-full-cover" style={getStyle()}>
            <div className={`title-container ${getGradientClass()}`}>
                <div className="title">{task.title}</div>
            </div>
        </div>
    )
}
