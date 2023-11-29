import { useForm } from '../../customHooks/useForm'
import { useNavigate } from 'react-router'
import { createBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { ImgSelect } from '../general/ImgSelect'

export function BoardCreate({ onClose }) {
    const navigate = useNavigate()

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyBoard()
    )

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const board = await createBoard(draft)
            onClose()
            navigate(`/b/${board._id}`)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onImgSelect(img) {
        setDraft({ ...draft, style: { backgroundImage: img } })
    }

    return (
        <form className="board-create-form" onSubmit={onSubmit}>
            <label htmlFor="title">Background</label>
            <ImgSelect
                images={boardService.getBackgroundImages()}
                selectedImg={draft.style.backgroundImage}
                onClick={onImgSelect}
            />
            <label htmlFor="title">Board Title</label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                value={draft.title}
            />
            <PrimaryBtn
                className="create-btn"
                text="Create"
                onClick={onSubmit}
            />
        </form>
    )
}
