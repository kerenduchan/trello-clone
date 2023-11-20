import { useForm } from '../../customHooks/useForm'
import { saveBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

import { Popover } from '../general/Popover'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'

export function BoardCreate({ onClose }) {
    const [draft, handleChange] = useForm({ title: '' })

    function onSubmit(e) {
        e.preventDefault()
        saveBoard(draft)
    }

    return (
        <Popover onClose={onClose} title="Create Board">
            <form className="board-create-form" onSubmit={onSubmit}>
                <label htmlFor="title">Background</label>
                <ul className="backgrounds">
                    {boardService.getBackgroundImages().map((img) => (
                        <li key={img._id}>
                            <button
                                className="background-btn"
                                style={{ backgroundImage: `url(${img.url})` }}
                            ></button>
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
