import { TaskLabelsMenuMainItem } from './TaskLabelsMenuMainItem'

export function TaskLabelsMenuMain({ board, group, task, onEditClick }) {
    return (
        <div className="task-labels-menu-main">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <TaskLabelsMenuMainItem
                            board={board}
                            group={group}
                            task={task}
                            label={label}
                            onEditClick={onEditClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
