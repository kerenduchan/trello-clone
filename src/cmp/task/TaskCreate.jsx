import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskCreate({ board, group, onClose }) {
    const [draft, handleChange, setDraft] = useForm(boardService.getEmptyTask())

    async function onSubmit(e) {
        e.preventDefault()
        group.tasks = [...group.tasks, draft]
        await updateBoard(board)
        onClose()
    }

    return (
        <>
            <form className="task-create" onSubmit={onSubmit}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter a title for this card..."
                    onChange={handleChange}
                    value={draft.title}
                />
                <PrimaryBtn className="add-btn" text="Add card" />
            </form>
            <SquareIconBtn icon="close" onClick={onClose} />
        </>
    )
}
