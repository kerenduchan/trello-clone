import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedinUser } from '../../../store/reducers/app.reducer'
import { boardService } from '../../../services/board/board.service'
import { userService } from '../../../services/user/user.service'
import { activityUtilService } from '../../../services/activity/activity.util.service'
import { useForm } from '../../../customHooks/useForm'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { TaskCommentCreateForm } from './TaskCommentCreateForm'
import { Avatar } from '../../general/Avatar'
import { TaskActivityItem } from '../activity/TaskActivityItem'
import { createActivity } from '../../../store/actions/activity/activity.actions'

export function TaskComments({ hierarchy, activities }) {
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
        const activity = activityUtilService.getActivityCreateComment(
            hierarchy,
            draft
        )
        createActivity(activity)
        setDraft(boardService.getEmptyComment())
        onHideForm()
    }

    function onActivityClick(activity) {
        setSelectedItemId((prev) =>
            prev === activity._id ? null : activity._id
        )
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
                {activities.map((a) => (
                    <li key={a._id}>
                        <TaskActivityItem
                            hierarchy={hierarchy}
                            activity={a}
                            isSelected={selectedItemId === a._id}
                            onClick={() => onActivityClick(a)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
