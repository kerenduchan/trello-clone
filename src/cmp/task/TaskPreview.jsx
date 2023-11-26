import { Link } from 'react-router-dom'
import { CircleBtn } from '../general/btn/CircleBtn'
import { TaskPreviewCover } from './TaskPreviewCover'
import { TaskPreviewLabels } from './TaskPreviewLabels'

export function TaskPreview({ board, task }) {
    function onEditClick() {
        // TODO
    }

    return (
        <section className="task-preview">
            <TaskPreviewCover task={task} />

            <Link className="link" to={`/b/${board._id}/c/${task._id}`} />
            <CircleBtn type="edit" onClick={onEditClick} />

            <div className="content">
                <TaskPreviewLabels board={board} task={task} />
                <p className="title">{task.title}</p>
            </div>
        </section>
    )
}
