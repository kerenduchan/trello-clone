import { updateTaskComment } from '../../../store/actions/task/task.comment.actions'
import { useForm } from '../../../customHooks/useForm'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskCommentEditForm({ hierarchy, comment, onClose }) {
    const [draft, handleChange] = useForm({ text: comment.text })

    function onSubmit(e) {
        e.preventDefault()
        updateTaskComment(hierarchy, comment, draft)
        onClose()
    }

    return (
        <form className="task-comment-edit-form" onSubmit={onSubmit}>
            <textarea
                autoFocus
                type="text"
                name="text"
                onChange={handleChange}
                value={draft.text}
            />

            <div className="edit-form-actions">
                <button
                    className="btn-primary btn-save"
                    disabled={draft.text.length === 0}
                >
                    Save
                </button>

                <SecondaryBtn
                    className="btn-discard-changes"
                    text="Discard changes"
                    onClick={onClose}
                />
            </div>
        </form>
    )
}
