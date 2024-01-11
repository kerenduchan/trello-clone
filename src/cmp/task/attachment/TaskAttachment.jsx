import moment from 'moment'
import { deleteTaskAttachment } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { DeleteMenu } from '../../general/DeleteMenu'
import { TaskAttachmentEdit } from './TaskAttachmentEdit'

export function TaskAttachment({ hierarchy, attachment }) {
    const deleteMenu = usePopoverState()
    const editMenu = usePopoverState()

    function onDelete() {
        deleteTaskAttachment(hierarchy, attachment)
    }

    function getCreationTime() {
        return moment(attachment.createdAt).fromNow()
    }

    return (
        <div className="task-attachment">
            <div
                className="preview"
                style={{ backgroundImage: `url(${attachment.fileUrl})` }}
            />
            <div className="details">
                <div className="title">{attachment.title}</div>

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
                    <span className="btn-link-small">Make cover</span>
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
