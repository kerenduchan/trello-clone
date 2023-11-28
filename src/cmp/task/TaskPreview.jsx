import { useNavigate } from 'react-router-dom'
import { CircleBtn } from '../general/btn/CircleBtn'
import { TaskPreviewCover } from './TaskPreviewCover'
import { LabelsPreview } from './label/LabelsPreview'
import { ChecklistsBadge } from './checklist/ChecklistsBadge'

export function TaskPreview({ board, task }) {
    const navigate = useNavigate()

    function onEditClick(e) {
        // stop propagation so that task details doesn't open
        e.stopPropagation()
        // TODO
    }

    function onClick() {
        navigate(`/b/${board._id}/c/${task._id}`)
    }

    return (
        <section className="task-preview" onClick={onClick}>
            <TaskPreviewCover task={task} />
            <CircleBtn type="edit" onClick={onEditClick} />

            <div className="content">
                <LabelsPreview board={board} task={task} />
                <p className="title">{task.title}</p>
                <div className="badges">
                    <ChecklistsBadge task={task} />
                </div>
            </div>
        </section>
    )
}
