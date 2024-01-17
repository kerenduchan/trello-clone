import { useNavigate } from 'react-router'
import { createBoard } from '../../store/actions/board/board.actions'
import { boardService } from '../../services/board/board.service'
import { useForm } from '../../customHooks/useForm'
import { PopoverMenu } from '../general/PopoverMenu'
import { ImgSelect } from '../general/ImgSelect'

export function BoardCreate({ popoverState }) {
    const navigate = useNavigate()

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyBoard()
    )

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const board = await createBoard(draft)
            popoverState.onClose()
            navigate(`/b/${board._id}`)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onImgSelect(img) {
        setDraft({ ...draft, style: { backgroundImage: img } })
    }

    function getPreviewStyle() {
        return {
            backgroundImage: `url(${draft.style.backgroundImage}?w=400)`,
        }
    }
    return (
        <PopoverMenu
            className="board-create-menu"
            title="Create Board"
            {...popoverState.popover}
        >
            {/* Preview */}
            <div className="preview-section">
                <div className="preview" style={getPreviewStyle()}></div>
                <img src="images/board-create-preview.svg" />
            </div>

            <form onSubmit={onSubmit}>
                {/* Background select */}
                <label htmlFor="title">Background</label>
                <ImgSelect
                    images={boardService.getBackgroundImages()}
                    selectedImg={draft.style.backgroundImage}
                    onClick={onImgSelect}
                />
                <label htmlFor="title">
                    Board Title
                    <span className="required-asterisk">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={draft.title}
                />
                <button
                    className="btn-primary btn-create"
                    disabled={draft.title.length === 0}
                >
                    Create
                </button>
            </form>
        </PopoverMenu>
    )
}
