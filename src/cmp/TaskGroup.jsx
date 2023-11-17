import { TaskPreview } from './TaskPreview'

// Represents a group of tasks (a list in the UI) in a board
export function TaskGroup({ taskGroup }) {
    return (
        <section className="task-group">
            <header className="task-group-header">
                <h2>{taskGroup.title}</h2>
            </header>

            <ol className="task-list">
                {taskGroup.tasks.map((t) => (
                    <li key={t._id}>
                        <TaskPreview task={t} />
                    </li>
                ))}
            </ol>
        </section>
    )
}
