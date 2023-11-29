import { useForm } from '../../../customHooks/useForm'
import { updateBoardLabel } from '../../../store/actions/board.actions'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'

export function LabelsMenuEdit({ board, group, task, label, onClose, onBack }) {
    const [draft, handleChange] = useForm({ ...label })

    async function onSubmit(e) {
        e.preventDefault()
        try {
            updateBoardLabel(board, label, { title: draft.title })
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
                <PrimaryBtn className="save-btn" text="Save" />
            </form>
        </div>
    )
}
