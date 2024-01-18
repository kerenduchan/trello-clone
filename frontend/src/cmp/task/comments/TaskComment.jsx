import moment from 'moment/moment'
import { boardService } from '../../../services/board/board.service'
import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { useState } from 'react'
import { TaskCommentEditForm } from './TaskCommentEditForm'

export function TaskComment({
    hierarchy,
    activity,
    isSelected,
    onClick,
    onDelete,
}) {
    const { board } = hierarchy
    const { comment } = activity

    const [showEditForm, setShowEditForm] = useState(false)
    const deleteCommentMenu = usePopoverState()

    function onDeleteComment() {
        onDelete()
        deleteCommentMenu.onClose()
    }

    function onEdit() {
        setShowEditForm(true)
    }

    function getCreatedBy() {
        return boardService.getItemById(board, 'members', comment.createdBy)
    }

    function getCreatedAt() {
        return moment(comment.createdAt).fromNow()
    }

    const createdBy = getCreatedBy()

    return (
        <div className={`task-comment ${isSelected ? 'selected' : ''}`}>
            <div className="created-by-avatar">
                <Avatar imgSrc={userService.getImgUrl(createdBy)} />
            </div>

            {showEditForm ? (
                <TaskCommentEditForm
                    hierarchy={hierarchy}
                    activity={activity}
                    onClose={() => setShowEditForm(false)}
                />
            ) : (
                <>
                    <div className="heading">
                        <span className="created-by-fullname">
                            {createdBy.fullname}
                        </span>
                        <span className="created-at" onClick={onClick}>
                            {getCreatedAt()}
                        </span>
                        {comment.isEdited && (
                            <span className="is-edited"> (edited)</span>
                        )}
                    </div>
                    <pre className="text">{comment.text}</pre>
                    <div className="actions">
                        <button onClick={onEdit}>Edit</button>
                        <span> • </span>
                        <button {...deleteCommentMenu.triggerAndTarget}>
                            Delete
                        </button>
                    </div>
                </>
            )}

            {/* Delete comment menu */}
            {deleteCommentMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteCommentMenu}
                    title="Delete comment?"
                    text="Deleting a comment is forever. There is no undo."
                    btnText="Delete comment"
                    onDelete={onDeleteComment}
                />
            )}
        </div>
    )
}
