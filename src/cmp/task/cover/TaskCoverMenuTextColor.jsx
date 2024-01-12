export function TaskCoverMenuTextColor({ hierarchy, onTextColorClick }) {
    const { textColor, url } = hierarchy.task.cover.bgImage

    const textColorOptions = [
        {
            id: 'light',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${url}")`,
        },
        {
            id: 'dark',
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("${url}")`,
        },
    ]

    function isSelected(option) {
        return textColor === option.id
    }

    return (
        <div className="task-cover-menu-text-color">
            <h4>Text color</h4>

            <ul>
                {textColorOptions.map((option) => (
                    <li
                        key={option.id}
                        className={`option option-${option.id} ${
                            isSelected(option) ? 'selected' : ''
                        }`}
                        style={{ backgroundImage: option.backgroundImage }}
                        onClick={() => onTextColorClick(option.id)}
                    >
                        cover
                    </li>
                ))}
            </ul>
        </div>
    )
}
