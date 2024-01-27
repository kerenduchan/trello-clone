export function TaskCoverMenuSize({ hierarchy, onSizeClick }) {
    const { task } = hierarchy
    const { cover } = task

    function onClick(size) {
        if (isDisabled()) {
            return
        }
        onSizeClick(size)
    }

    function getCoverStyle() {
        if (!cover) {
            return null
        }
        if (cover.bgColor) {
            return { backgroundColor: cover.bgColor.color }
        }
        if (cover.bgImage) {
            return { backgroundImage: `url(${cover.bgImage.url})` }
        }
    }

    function getTextColor() {
        return cover?.bgColor?.textColor
    }

    function isSelected(size) {
        if (isDisabled()) {
            return false
        }
        return cover.size === size
    }

    function isDisabled() {
        if (!cover) {
            return true
        }
        return !cover.bgColor && !cover.bgImage
    }

    return (
        <div
            className={`task-cover-menu-size ${isDisabled() ? 'disabled' : ''}`}
        >
            <ul>
                {/* Small cover */}
                <li
                    className={`size-small ${
                        isSelected('small') ? 'selected' : ''
                    }`}
                    onClick={() => onClick('small')}
                >
                    <div className="cover" style={getCoverStyle()} />
                    <div className="contents">
                        <div className="mock-row" />
                        <div className="mock-row mock-row-2" />
                        <div className="mock-row-3">
                            <div className="mock-small" />
                            <div className="mock-small" />
                            <div className="mock-circle" />
                        </div>
                    </div>
                </li>

                {/* Large cover */}
                <li
                    className={`size-large cover ${
                        isSelected('large') ? 'selected' : ''
                    }`}
                    style={getCoverStyle()}
                    onClick={() => onClick('large')}
                >
                    <div className="contents">
                        <div
                            className="mock-row"
                            style={{ backgroundColor: getTextColor() }}
                        />
                        <div
                            className="mock-row mock-row-2"
                            style={{ backgroundColor: getTextColor() }}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}
