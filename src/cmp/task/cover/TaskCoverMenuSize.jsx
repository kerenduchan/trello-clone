export function TaskCoverMenuSize({ hierarchy, onSizeClick }) {
    const { task } = hierarchy

    function onClick(size) {
        if (!getColor()) {
            return
        }
        onSizeClick(size)
    }

    function getColor() {
        return task.cover?.bgColor?.color
    }

    function getTextColor() {
        return task.cover?.bgColor?.textColor
    }

    function isSelected(size) {
        if (!task.cover?.bgColor) return false
        return task.cover?.size === size
    }

    function isDisabled() {
        return !task.cover?.bgColor
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
                    <div
                        className="cover"
                        style={{ backgroundColor: getColor() }}
                    />
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
                    style={{ backgroundColor: getColor() }}
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
