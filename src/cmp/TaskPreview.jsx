import { Link } from 'react-router-dom'

export function TaskPreview({ board, task }) {
    return (
        <Link to={`/b/${board._id}/c/${task._id}`}>
            <section className="task-preview">
                {task.cover && (
                    <div
                        className="cover"
                        style={{
                            backgroundColor: task.cover.bgColor,
                        }}
                    ></div>
                )}
                <p className="title">{task.title}</p>
            </section>
        </Link>
    )
}
