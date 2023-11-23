import { TaskLabelsMenuItem } from './TaskLabelsMenuItem'

export function TaskLabelsMenu({ board, task }) {
    return (
        <div className="task-labels-menu">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <TaskLabelsMenuItem
                            board={board}
                            task={task}
                            label={label}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
