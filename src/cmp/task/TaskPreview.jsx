import { Link } from 'react-router-dom'
import { CircleBtn } from '../general/btn/CircleBtn'

export function TaskPreview({ board, task }) {
    function onEditClick() {
        // TODO
    }

    return (
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
            <Link className="link" to={`/b/${board._id}/c/${task._id}`} />
            <CircleBtn type="edit" onClick={onEditClick} />
        </section>
    )
}
