import { Icon } from './Icon'
import { SecondaryBtn } from './SecondaryBtn'
import { TaskPreview } from './TaskPreview'

// Represents a group of tasks (a list in the UI) in a board
export function TaskGroup({ board, taskGroup }) {
    return (
        <section className="task-group">
            <header className="header">
                <h2>{taskGroup.title}</h2>
                <button className="more-btn">
                    <Icon type="more" size="xs"></Icon>
                </button>
            </header>

            <ol className="task-list">
                {taskGroup.tasks.map((t) => (
                    <li key={t._id}>
                        <TaskPreview board={board} task={t} />
                    </li>
                ))}
            </ol>
        </section>
    )
}
