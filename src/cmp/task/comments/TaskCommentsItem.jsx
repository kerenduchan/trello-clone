import moment from 'moment/moment'
import { boardService } from '../../../services/board.service'
import { Avatar } from '../../general/Avatar'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { deleteTaskComment } from '../../../store/actions/board.actions'

export function TaskCommentsItem({ hierarchy, item, isSelected, onClick }) {
    const { board } = hierarchy
    const deleteCommentMenu = usePopoverState()

    function onDeleteComment() {
        deleteTaskComment(hierarchy, item)
        deleteCommentMenu.onClose()
    }

    function onEdit() {}

    function getCreatedBy() {
        return boardService.getItemById(board, 'members', item.createdBy)
    }

    function getCreatedAt() {
        return moment(item.createdAt).fromNow()
    }

    const createdBy = getCreatedBy()

    return (
        <div className={`task-comments-item ${isSelected ? 'selected' : ''}`}>
            <div className="created-by-avatar">
                <Avatar imgSrc={createdBy.imgUrl} />
            </div>
            <div className="heading">
                <span className="created-by-fullname">
                    {createdBy.fullname}
                </span>
                <span className="created-at" onClick={onClick}>
                    {getCreatedAt()}
                </span>
            </div>
            <div className="text">{item.text}</div>
            <div className="actions">
                <button onClick={onEdit}>Edit</button>
                <span> • </span>
                <button {...deleteCommentMenu.triggerAndTarget}>Delete</button>
            </div>

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
