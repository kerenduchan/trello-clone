import { boardService } from '../../../services/board.service'

export function TaskCoverMenuColors({ hierarchy, onColorClick }) {
    const { task } = hierarchy

    function isSelected(color) {
        return task.cover?.bgColor?._id === color._id
    }

    return (
        <ul className="task-cover-menu-colors">
            {boardService.getCoverColors().map((c) => (
                <li key={c._id}>
                    <div
                        className={`btn-color ${
                            isSelected(c) ? ' selected' : ''
                        }`}
                        style={{ backgroundColor: c.color }}
                        onClick={() => onColorClick(c)}
                    />
                </li>
            ))}
        </ul>
    )
}
