import { TaskLabelsMenuItem } from './TaskLabelsMenuItem'

export function TaskLabelsMenu({ board, task }) {
    function isLabelUsed(labelId) {
        // todo
        return false
    }

    return (
        <div className="task-labels-menu">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <TaskLabelsMenuItem
                            label={label}
                            isChecked={isLabelUsed(label._id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
