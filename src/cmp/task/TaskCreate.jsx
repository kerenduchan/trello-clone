import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskCreate({ board, group, onClose }) {
    const [draft, handleChange] = useForm(boardService.getEmptyTask())

    async function onSubmit(e) {
        e.preventDefault()

        if (draft.title.length > 0) {
            // add the new task to this group in the board
            const boardClone = deepClone(board)
            const groupClone = boardService.getGroupById(boardClone, group._id)
            groupClone.tasks.push(draft)
            updateBoard(boardClone)
        }
        onClose()
    }

    return (
        <form className="task-create-form" onSubmit={onSubmit}>
            <input
                autoFocus
                id="title"
                name="title"
                placeholder="Enter a title for this card..."
                onChange={handleChange}
                value={draft.title}
            />
            <PrimaryBtn className="add-btn" text="Add card" />
            <SquareIconBtn icon="close" onClick={onClose} />
        </form>
    )
}
