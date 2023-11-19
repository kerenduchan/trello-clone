import { Icon } from './Icon'
import { SquareIconBtn } from './SquareIconBtn'
import { TaskPreview } from './TaskPreview'

// Represents a group of tasks (a list in the UI) in a board
export function TaskGroup({ board, taskGroup }) {
    return (
        <section className="task-group">
            <header className="header">
                <h2>{taskGroup.title}</h2>
                <SquareIconBtn className="more-btn" icon="more" />
            </header>

            <ol className="task-list">
                {taskGroup.tasks.map((t) => (
                    <li key={t._id}>
                        <TaskPreview board={board} task={t} />
                    </li>
                ))}
            </ol>

            <button className="add-btn">
                <Icon type="add"></Icon>
                <span>Add a card</span>
            </button>
        </section>
    )
}
