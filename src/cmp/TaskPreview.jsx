import { Link } from 'react-router-dom'

export function TaskPreview({ board, task }) {
    return (
        <Link to={`/b/${board._id}/c/${task._id}`}>
            <section className="task-preview">
                <p className="title">{task.title}</p>
            </section>
        </Link>
    )
}
