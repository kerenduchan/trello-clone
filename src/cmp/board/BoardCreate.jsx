import { useForm } from '../../customHooks/useForm'
import { saveBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { Popover } from '../general/Popover'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { Icon } from '../general/Icon'

export function BoardCreate({ onClose }) {
    const [draft, handleChange, setDraft] = useForm({
        title: '',
        backgroundId: 'bg1',
    })

    function onSubmit(e) {
        e.preventDefault()
        saveBoard(draft)
    }

    function onBackgroundClick(backgroundId) {
        setDraft({ ...draft, backgroundId })
    }

    function isBackgroundSelected(backgroundId) {
        return draft.backgroundId === backgroundId
    }

    return (
        <Popover onClose={onClose} title="Create Board">
            <form className="board-create-form" onSubmit={onSubmit}>
                <label htmlFor="title">Background</label>
                <ul className="backgrounds">
                    {boardService.getBackgroundImages().map((img) => (
                        <li
                            className="background-item"
                            key={img._id}
                            style={{ backgroundImage: `url(${img.url})` }}
                            onClick={() => onBackgroundClick(img._id)}
                        >
                            <div className="overlay"></div>
                            <Icon
                                type="check"
                                className={
                                    isBackgroundSelected(img._id)
                                        ? ''
                                        : 'hidden'
                                }
                            />
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
