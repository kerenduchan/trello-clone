import { useForm } from '../../customHooks/useForm'
import { useNavigate } from 'react-router'
import { saveBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'
import { Popover } from '../general/Popover'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { ImgSelect } from '../general/ImgSelect'

export function BoardCreate({ onClose }) {
    const navigate = useNavigate()

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyBoard()
    )

    async function onSubmit(e) {
        e.preventDefault()
        const board = await saveBoard(draft)
        onClose()
        navigate(`/b/${board._id}`)
    }

    function onImgSelect(img) {
        setDraft({ ...draft, style: { backgroundImage: img } })
    }

    return (
        <Popover onClose={onClose} title="Create Board">
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
                <PrimaryBtn className="create-btn" text="Create" />
            </form>
        </Popover>
    )
}
