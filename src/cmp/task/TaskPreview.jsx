import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useNavigate } from 'react-router-dom'
import { TaskPreviewCover } from './TaskPreviewCover'
import { LabelsPreview } from './label/LabelsPreview'
import { ChecklistsBadge } from './checklist/ChecklistsBadge'
import { TaskDatesBadge } from './dates/TaskDatesBadge'
import { Icon } from '../general/Icon'
import { MembersBadge } from './members/MembersBadge'
import { TaskCommentsBadge } from './comments/TaskCommentsBadge'
import { utilService } from '../../services/util.service'

export function TaskPreview({ hierarchy }) {
    const { board, group, task } = hierarchy

    const navigate = useNavigate()
    const [index, setIndex] = useState(null)

    useEffect(() => {
        // determine the index of the task in the group
        setIndex(
            utilService.getIdxById(
                group.tasks.filter((task) => !task.archivedAt),
                task._id
            )
        )
    }, [hierarchy])

    function onEditClick(e) {
        // stop propagation so that task details doesn't open
        e.stopPropagation()
        // TODO
    }

    function onClick() {
        navigate(`/b/${board._id}/c/${task._id}`)
    }

    if (!index) return <></>

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <section
                    className={`task-preview ${
                        snapshot.isDragging ? 'dragging' : ''
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={onClick}
                >
                    <TaskPreviewCover hierarchy={hierarchy} />

                    <div className="container-btn-edit">
                        <div className="bg-btn-edit" />
                        <button
                            className="btn-circle btn-edit"
                            onClick={onEditClick}
                        >
                            <Icon type="edit" />
                        </button>
                    </div>
                    <div className="content">
                        <LabelsPreview hierarchy={hierarchy} />
                        <p className="title">{task.title}</p>

                        <div className="badges">
                            <TaskDatesBadge hierarchy={hierarchy} />

                            {task.description && (
                                <span className="description-badge">
                                    <Icon type="description" size="xs" />
                                </span>
                            )}

                            <TaskCommentsBadge hierarchy={hierarchy} />
                            <ChecklistsBadge hierarchy={hierarchy} />
                            <MembersBadge hierarchy={hierarchy} />
                        </div>
                    </div>
                </section>
            )}
        </Draggable>
    )
}
