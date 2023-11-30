import { useNavigate } from 'react-router-dom'
import { CircleBtn } from '../general/btn/CircleBtn'
import { TaskPreviewCover } from './TaskPreviewCover'
import { LabelsPreview } from './label/LabelsPreview'
import { ChecklistsBadge } from './checklist/ChecklistsBadge'
import { Icon } from '../general/Icon'
import { MembersBadge } from './members/MembersBadge'

export function TaskPreview({ hierarchy }) {
    const { board, task } = hierarchy

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
            <TaskPreviewCover hierarchy={hierarchy} />

            <div className="edit-btn-container">
                <div className="edit-btn-bg" />
                <CircleBtn type="edit" onClick={onEditClick} />
            </div>
            <div className="content">
                <LabelsPreview hierarchy={hierarchy} />
                <p className="title">{task.title}</p>

                <div className="badges">
                    {task.description && (
                        <span className="description-badge">
                            <Icon type="description" size="xs" />
                        </span>
                    )}
                    <ChecklistsBadge hierarchy={hierarchy} />
                    <MembersBadge hierarchy={hierarchy} />
                </div>
            </div>
        </section>
    )
}
