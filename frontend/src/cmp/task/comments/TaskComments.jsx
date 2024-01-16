import { useState } from 'react'
import { boardService } from '../../../services/board/board.service'
import { authService } from '../../../services/auth/auth.service'
import { addTaskComment } from '../../../store/actions/task/task.comment.actions'
import { useForm } from '../../../customHooks/useForm'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { TaskCommentCreateForm } from './TaskCommentCreateForm'
import { TaskComment } from './TaskComment'
import { Avatar } from '../../general/Avatar'

export function TaskComments({ hierarchy }) {
    const { task } = hierarchy
    const [selectedItemId, setSelectedItemId] = useState()

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

    const user = authService.getLoggedinUser()

    return (
        <div className="task-comments">
            <div className="logged-in-user-avatar">
                <Avatar imgSrc={user.imgUrl} />
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
                            onClick={() => setSelectedItemId(c._id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
