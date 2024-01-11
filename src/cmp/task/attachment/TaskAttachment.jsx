import moment from 'moment'
import { deleteTaskAttachment } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { DeleteMenu } from '../../general/DeleteMenu'

export function TaskAttachment({ hierarchy, attachment }) {
    const deleteMenu = usePopoverState()

    function onDelete() {
        deleteTaskAttachment(hierarchy, attachment)
    }

    function getTitle() {
        const { title, fileUrl } = attachment
        if (title) {
            return title
        }

        const urlParts = fileUrl.split('/')
        return urlParts[urlParts.length - 1]
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
                <div className="title">{getTitle()}</div>

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
                    <button className="action btn-link-small edit">Edit</button>
                </div>
                <div className="make-cover">
                    <Icon type="cover" />
                    <span className="btn-link-small">Make cover</span>
                </div>
            </div>

            {/* Delete attachment menu */}

            {/* Delete task menu */}
            {deleteMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteMenu}
                    title="Delete attachment?"
                    text="Deleting an attachment is permanent. There is no undo."
                    onDelete={onDelete}
                />
            )}
        </div>
    )
}
