export function TaskCoverMenuSize({ hierarchy, onSizeClick }) {
    const { task } = hierarchy

    function getColor() {
        return task.cover?.bgColor?.color
    }

    return (
        <div className="task-cover-menu-size">
            <ul>
                {/* Small cover */}
                <li className="size-small">
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
                    className="size-large"
                    style={{ backgroundColor: getColor() }}
                >
                    <div className="contents">
                        <div className="mock-row" />
                        <div className="mock-row mock-row-2" />
                    </div>
                </li>
            </ul>
        </div>
    )
}
