import { TaskPreview } from '../task/TaskPreview'

export function TaskList({ board, group }) {
    return (
        <ol className="task-list">
            {group.tasks
                .filter((task) => task.archivedAt === null)
                .map((task) => (
                    <li key={task._id}>
                        <TaskPreview hierarchy={{ board, group, task }} />
                    </li>
                ))}
        </ol>
    )
}
