import { useForm } from '../../customHooks/useForm'

export function TitleEditForm({ title, onSubmit }) {
    const [draft, handleChange] = useForm({ title })

    function onSubmitInternal(e) {
        e.preventDefault()
        onSubmit(draft)
    }

    return (
        <form onSubmit={onSubmitInternal}>
            <input
                autoFocus
                type="text"
                name="title"
                onChange={handleChange}
                value={draft.title}
                onBlur={onSubmitInternal}
            />
        </form>
    )
}
