import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'

export function TaskLabelsMenuEdit({
    board,
    group,
    task,
    label,
    onClose,
    onBack,
}) {
    const [draft, handleChange] = useForm({ ...label })

    async function onSubmit(e) {
        e.preventDefault()
        // edit the label title at the board level
        const boardClone = structuredClone(board)
        const labelClone = boardService.getLabelById(boardClone, label._id)
        labelClone.title = draft.title
        updateBoard(boardClone)
        onBack()
    }

    return (
        <div className="task-labels-menu-edit">
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
