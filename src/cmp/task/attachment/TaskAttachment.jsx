import moment from 'moment'
import {
    deleteTaskAttachment,
    removeTaskCover,
    setTaskCoverImage,
} from '../../../store/actions/task.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { DeleteMenu } from '../../general/DeleteMenu'
import { TaskAttachmentEdit } from './TaskAttachmentEdit'

export function TaskAttachment({ hierarchy, attachment }) {
    const { task } = hierarchy
    const deleteMenu = usePopoverState()
    const editMenu = usePopoverState()

    function onDelete() {
        deleteTaskAttachment(hierarchy, attachment)
    }

    function onToggleCover() {
        isCover()
            ? removeTaskCover(hierarchy)
            : setTaskCoverImage(hierarchy, attachment)
    }

    function getCreationTime() {
        return moment(attachment.createdAt).fromNow()
    }

    function isCover() {
        return task.cover?.bgImage?.attachmentId === attachment._id
    }

    return (
        <div className="task-attachment">
            <div
                className="preview"
                style={{ backgroundImage: `url(${attachment.fileUrl})` }}
            />
            <div className="details">
                <div className="header">
                    <span className="title">{attachment.title}</span>
                    <a href={attachment.fileUrl} target="_blank">
                        <Icon type="north_east" />
                    </a>
                </div>

                <div className="actions">
                    <span className="creation-time">
                        Added {getCreationTime()}
                    </span>
                    <span> • </span>

                    <button
                        className="action btn-link-small delete"
                        {...deleteMenu.triggerAndTarget}
                    >
                        Delete
                    </button>
                    <span> • </span>
                    <button
                        className="action btn-link-small edit"
                        {...editMenu.triggerAndTarget}
                    >
                        Edit
                    </button>
                </div>
                <div className="make-cover">
                    <Icon type="cover" />
                    <span className="btn-link-small" onClick={onToggleCover}>
                        {isCover() ? 'Remove' : 'Make'} cover
                    </span>
                </div>
            </div>

            {/* Delete attachment menu */}
            {deleteMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteMenu}
                    title="Delete attachment?"
                    text="Deleting an attachment is permanent. There is no undo."
                    onDelete={onDelete}
                />
            )}

            {/* Edit attachment menu */}
            {editMenu.show && (
                <TaskAttachmentEdit
                    popoverState={editMenu}
                    hierarchy={hierarchy}
                    attachment={attachment}
                />
            )}
        </div>
    )
}
