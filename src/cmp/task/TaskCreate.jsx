import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskCreate({ board, group, onClose }) {
    const [draft, handleChange] = useForm(boardService.getEmptyTask())

    async function onSubmit(e) {
        e.preventDefault()
        group.tasks = [...group.tasks, draft]
        updateBoard(board)
        onClose()
    }

    return (
        <div className="task-create">
            <form onSubmit={onSubmit}>
                <input
                    autoFocus
                    id="title"
                    name="title"
                    placeholder="Enter a title for this card..."
                    onChange={handleChange}
                    value={draft.title}
                />
                <PrimaryBtn className="add-btn" text="Add card" />
            </form>
            <SquareIconBtn icon="close" onClick={onClose} />
        </div>
    )
}
