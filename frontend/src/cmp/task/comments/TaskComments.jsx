import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedinUser } from '../../../store/reducers/app.reducer'
import { boardService } from '../../../services/board/board.service'
import { userService } from '../../../services/user/user.service'
import { addTaskComment } from '../../../store/actions/task/task.comment.actions'
import { useForm } from '../../../customHooks/useForm'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { TaskCommentCreateForm } from './TaskCommentCreateForm'
import { TaskComment } from './TaskComment'
import { Avatar } from '../../general/Avatar'

export function TaskComments({ hierarchy }) {
    const { task } = hierarchy
    const [selectedItemId, setSelectedItemId] = useState()
    const loggedinUser = useSelector(selectLoggedinUser)

    // TODO: show form and comment if comment draft exists on the task
    const [showForm, setShowForm] = useState(false)

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyComment()
    )

    useKeyDownListener(['Escape'], onHideForm)

    function onHideForm() {
        setShowForm(false)
    }

    function onShowForm() {
        setShowForm(true)
    }

    function onSubmitForm() {
        addTaskComment(hierarchy, draft)
        setDraft(boardService.getEmptyComment())
        onHideForm()
    }

    function onCommentClick(comment) {
        setSelectedItemId((prev) => (prev === comment._id ? null : comment._id))
    }

    return (
        <div className="task-comments">
            <div className="logged-in-user-avatar">
                <Avatar imgSrc={userService.getImgUrl(loggedinUser)} />
            </div>
            {showForm ? (
                <TaskCommentCreateForm
                    draft={draft}
                    handleChange={handleChange}
                    onSubmit={onSubmitForm}
                />
            ) : (
                <button className="btn-create" onClick={onShowForm}>
                    Write a comment...
                </button>
            )}

            <ul className="comments-list">
                {task.comments?.map((c) => (
                    <li key={c._id}>
                        <TaskComment
                            hierarchy={hierarchy}
                            comment={c}
                            isSelected={selectedItemId === c._id}
                            onClick={() => onCommentClick(c)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
