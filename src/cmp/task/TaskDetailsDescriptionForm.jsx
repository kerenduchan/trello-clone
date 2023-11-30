import { useForm } from '../../customHooks/useForm'
import { updateTask } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'

export function TaskDetailsDescriptionForm({ hierarchy, onClose }) {
    const { task } = hierarchy
    const [draft, handleChange] = useForm({ description: task.description })

    function onSubmit(e) {
        e.preventDefault()
        updateTask(hierarchy, draft)
        onClose()
    }

    return (
        <form className="task-details-description-form" onSubmit={onSubmit}>
            <textarea
                autoFocus
                id="description"
                name="description"
                onChange={handleChange}
                value={draft.description}
            />
            <div className="actions">
                <PrimaryBtn className="save-btn" text="Save" />
                <SecondaryBtn
                    className="cancel-btn"
                    text="Cancel"
                    onClick={onClose}
                />
            </div>
        </form>
    )
}
