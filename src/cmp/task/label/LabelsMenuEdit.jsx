import { useForm } from '../../../customHooks/useForm'
import { updateBoardLabel } from '../../../store/actions/board.actions'

export function LabelsMenuEdit({ hierarchy, label, onBack }) {
    const [draft, handleChange] = useForm({ ...label })

    async function onSubmit(e) {
        e.preventDefault()
        try {
            updateBoardLabel(hierarchy.board, label, { title: draft.title })
            onBack()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="labels-menu-edit">
            <div className="preview-container">
                <div
                    className="preview"
                    style={{ backgroundColor: label.color }}
                >
                    {draft.title}
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={draft.title}
                />
                <button className="btn-primary btn-save">Save</button>
            </form>
        </div>
    )
}
