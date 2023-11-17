import { TaskPreview } from './TaskPreview'

// Represents a group of tasks (a list in the UI) in a board
export function TaskGroup({ taskGroup }) {
    return (
        <section className="task-group">
            <h2>{taskGroup.title}</h2>
            <ul>
                {taskGroup.tasks.map((t) => (
                    <li key={t._id}>
                        <TaskPreview task={t} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
