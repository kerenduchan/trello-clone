export function TaskCoverMenuSize({ hierarchy, onSizeClick }) {
    const { task } = hierarchy

    function getColor() {
        return task.cover?.bgColor?.color
    }

    function getTextColor() {
        return task.cover?.bgColor?.textColor
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
                        <div
                            className={`mock-row ${
                                getColor() ? '' : 'no-cover'
                            }`}
                        />
                        <div
                            className={`mock-row mock-row-2 ${
                                getColor() ? '' : 'no-cover'
                            }`}
                        />
                        <div className="mock-row-3">
                            <div
                                className={`mock-small ${
                                    getColor() ? '' : 'no-cover'
                                }`}
                            />
                            <div
                                className={`mock-small ${
                                    getColor() ? '' : 'no-cover'
                                }`}
                            />
                            <div
                                className={`mock-circle ${
                                    getColor() ? '' : 'no-cover'
                                }`}
                            />
                        </div>
                    </div>
                </li>

                {/* Large cover */}
                <li
                    className="size-large cover"
                    style={{ backgroundColor: getColor() }}
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
