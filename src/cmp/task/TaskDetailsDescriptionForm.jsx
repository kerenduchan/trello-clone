import { useForm } from '../../customHooks/useForm'
import { updateTask } from '../../store/actions/board.actions'

export function TaskDetailsDescriptionForm({ hierarchy, onClose }) {
    const { task } = hierarchy
    const [draft, handleChange] = useForm({ description: task.description })

    function onSubmit(e) {
        e.preventDefault()
        updateTask(hierarchy, draft)
        onClose()
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <form
            className="task-details-description-form"
            onSubmit={onSubmit}
            onBlur={onSubmit}
        >
            <textarea
                autoFocus
                id="description"
                name="description"
                onKeyDown={onKeyDown}
                onChange={handleChange}
                value={draft.description}
            />
        </form>
    )
}
