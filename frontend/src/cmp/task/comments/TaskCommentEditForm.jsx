import { useForm } from '../../../customHooks/useForm'
import { updateActivity } from '../../../store/actions/activity/activity.actions'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskCommentEditForm({ activity, onClose }) {
    const { comment } = activity

    const [draft, handleChange] = useForm({ text: comment.text })

    function onSubmit(e) {
        e.preventDefault()
        const fields = { comment: { ...draft, isEdited: true } }
        updateActivity(activity, fields)
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
