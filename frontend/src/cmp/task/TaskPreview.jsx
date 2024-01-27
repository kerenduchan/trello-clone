import { Draggable } from 'react-beautiful-dnd'
import { useNavigate } from 'react-router-dom'
import { TaskPreviewCover } from './TaskPreviewCover'
import { LabelsPreview } from './label/LabelsPreview'
import { ChecklistsBadge } from './checklist/ChecklistsBadge'
import { TaskDatesBadge } from './dates/TaskDatesBadge'
import { Icon } from '../general/Icon'
import { MembersBadge } from './members/MembersBadge'
import { TaskCommentsBadge } from './comments/TaskCommentsBadge'
import { TaskPreviewFullCover } from './TaskPreviewFullCover'
import { TaskAttachmentsBadge } from './attachment/TaskAttachmentsBadge'

export function TaskPreview({ hierarchy, index }) {
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

    function isFullCover() {
        return (
            (task.cover?.bgImage || task.cover?.bgColor) &&
            task.cover?.size === 'large'
        )
    }

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <section
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={onClick}
                >
                    <div
                        className={`task-preview ${
                            snapshot.isDragging ? 'dragging' : ''
                        }`}
                    >
                        {/* <div className="container-btn-edit">
                        <div className="bg-btn-edit" />
                        <button
                            className="btn-circle btn-edit"
                            onClick={onEditClick}
                        >
                            <Icon type="edit" />
                        </button>
                    </div> */}
                        {isFullCover() ? (
                            <TaskPreviewFullCover hierarchy={hierarchy} />
                        ) : (
                            <>
                                <TaskPreviewCover hierarchy={hierarchy} />

                                <div className="content">
                                    <LabelsPreview hierarchy={hierarchy} />
                                    <p className="title">{task.title}</p>

                                    <div className="badges">
                                        <TaskDatesBadge hierarchy={hierarchy} />

                                        {task.description && (
                                            <span className="description-badge">
                                                <Icon
                                                    type="description"
                                                    size="xs"
                                                />
                                            </span>
                                        )}

                                        <TaskCommentsBadge
                                            hierarchy={hierarchy}
                                        />
                                        <TaskAttachmentsBadge
                                            hierarchy={hierarchy}
                                        />
                                        <ChecklistsBadge
                                            hierarchy={hierarchy}
                                        />
                                        <MembersBadge hierarchy={hierarchy} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}
        </Draggable>
    )
}
