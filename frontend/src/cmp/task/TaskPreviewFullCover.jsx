export function TaskPreviewFullCover({ hierarchy }) {
    const { task } = hierarchy
    const { cover } = task

    function getGradientClass() {
        if (cover.bgColor) {
            return ''
        }

        return `gradient-${
            cover.bgImage.textColor === 'light' ? 'dark' : 'light'
        }`
    }

    return (
        <div className="task-preview-full-cover">
            {cover.bgColor ? (
                <div
                    className="bg-color"
                    style={{ backgroundColor: cover.bgColor.color }}
                />
            ) : (
                <img className="bg-image" src={cover.bgImage.url} />
            )}

            <div className={`title-container ${getGradientClass()}`}>
                <div
                    className="title"
                    style={{ color: cover.bgColor?.textColor }}
                >
                    {task.title}
                </div>
            </div>
        </div>
    )
}
