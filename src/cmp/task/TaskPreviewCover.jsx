export function TaskPreviewCover({ hierarchy }) {
    const { task } = hierarchy

    if (!hasCover()) return <></>

    function hasCover() {
        const cover = task.cover
        return cover?.bgImage || cover?.bgColor
    }

    function getStyle() {
        const { bgColor, bgImage } = task.cover

        if (bgColor) {
            return { backgroundColor: bgColor.color }
        }

        var img = new Image()

        return {
            backgroundImage: `url(${bgImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            height: '250px',
            backgroundRepeat: 'no-repeat',
        }
    }

    return <div className="task-preview-cover" style={getStyle()}></div>
}
