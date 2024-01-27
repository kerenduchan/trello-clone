export function TaskPreviewCover({ hierarchy }) {
    const { task } = hierarchy
    const { cover } = task

    if (!hasCover()) return <></>

    function hasCover() {
        return cover?.bgImage || cover?.bgColor
    }

    return (
        <div className="task-preview-cover">
            {cover.bgColor ? (
                <div
                    className="bg-color"
                    style={{ backgroundColor: cover.bgColor.color }}
                />
            ) : (
                <img className="bg-image" src={cover.bgImage.url} />
            )}
        </div>
    )
}
