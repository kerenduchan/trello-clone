import { TaskLabelsMenuItem } from './TaskLabelsMenuItem'

export function TaskLabelsMenu({ board, group, task }) {
    return (
        <div className="task-labels-menu">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <TaskLabelsMenuItem
                            board={board}
                            group={group}
                            task={task}
                            label={label}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
