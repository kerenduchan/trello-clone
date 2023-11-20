import { useForm } from '../../customHooks/useForm'
import { saveBoard } from '../../store/actions/board.actions'
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
