export function TaskCommentCreateForm({ draft, handleChange, onSubmit }) {
    function onSubmitInternal(e) {
        e.preventDefault()
        onSubmit()
    }
    return (
        <form className="task-comment-create-form" onSubmit={onSubmitInternal}>
            <textarea
                autoFocus
                type="text"
                name="text"
                onChange={handleChange}
                value={draft.text}
            />
            <button
                className="btn-primary btn-save"
                disabled={draft.text.length === 0}
            >
                Save
            </button>
        </form>
    )
}
