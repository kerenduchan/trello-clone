import { useForm } from '../../customHooks/useForm'
import { saveBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { Popover } from '../general/Popover'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { Icon } from '../general/Icon'
import { useNavigate } from 'react-router'
import { buildClassName } from '../../util'

export function BoardCreate({ onClose }) {
    const navigate = useNavigate()

    const [draft, handleChange, setDraft] = useForm({
        title: '',
        style: {
            backgroundImage: '',
        },
    })

    async function onSubmit(e) {
        e.preventDefault()
        const board = await saveBoard(draft)
        onClose()
        navigate(`/b/${board._id}`)
    }

    function onBackgroundClick(img) {
        setDraft({ ...draft, style: { backgroundImage: img.url } })
    }

    function isBackgroundSelected(img) {
        return draft.style.backgroundImage === img.url
    }
    return (
        <Popover onClose={onClose} title="Create Board">
            <form className="board-create-form" onSubmit={onSubmit}>
                <label htmlFor="title">Background</label>
                <ul className="backgrounds">
                    {boardService.getBackgroundImages().map((img) => (
                        <li
                            key={img._id}
                            className={buildClassName(
                                'background-item',
                                isBackgroundSelected(img) ? 'selected' : ''
                            )}
                            style={{ backgroundImage: `url(${img.url}?w=400)` }}
                            onClick={() => onBackgroundClick(img)}
                        >
                            <div className="overlay"></div>
                            <Icon type="check" />
                        </li>
                    ))}
                </ul>

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
