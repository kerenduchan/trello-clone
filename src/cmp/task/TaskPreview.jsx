import { Link, useNavigate } from 'react-router-dom'
import { CircleBtn } from '../general/btn/CircleBtn'
import { TaskPreviewCover } from './TaskPreviewCover'
import { TaskPreviewLabels } from './TaskPreviewLabels'

export function TaskPreview({ board, task }) {
    const navigate = useNavigate()

    function onEditClick() {
        // TODO
    }

    function onClick() {
        navigate(`/b/${board._id}/c/${task._id}`)
    }

    return (
        <section className="task-preview" onClick={onClick}>
            <TaskPreviewCover task={task} />

            {/* <Link className="link" to={`/b/${board._id}/c/${task._id}`} /> */}
            <CircleBtn type="edit" onClick={onEditClick} />

            <div className="content">
                <TaskPreviewLabels board={board} task={task} />
                <p className="title">{task.title}</p>
            </div>
        </section>
    )
}
