import { TaskPreview } from '../task/TaskPreview'

export function TaskList({ board, tasks }) {
    return (
        <ol className="task-list">
            {tasks.map((t) => (
                <li key={t._id}>
                    <TaskPreview board={board} task={t} />
                </li>
            ))}
        </ol>
    )
}
