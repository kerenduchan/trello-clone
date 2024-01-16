import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskDescriptionForm({
    draft,
    handleChange,
    onClose,
    onSubmit,
}) {
    function onSubmitInternal(e) {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className="task-description-form" onSubmit={onSubmitInternal}>
            <textarea
                autoFocus
                id="description"
                name="description"
                onChange={handleChange}
                value={draft?.description || ''}
            />
            <div className="actions">
                <button className="btn-primary btn-save">Save</button>
                <SecondaryBtn
                    className="btn-cancel"
                    text="Cancel"
                    onClick={onClose}
                />
            </div>
        </form>
    )
}
