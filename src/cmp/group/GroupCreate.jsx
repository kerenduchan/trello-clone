import { useForm } from '../../customHooks/useForm'
import { useToggle } from '../../customHooks/useToggle'
import { updateBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { deepClone } from '../../util'

export function GroupCreate({ board }) {
    const [showForm, toggleShowForm, setShowForm] = useToggle()

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyGroup()
    )

    async function onSubmit(e) {
        // add the new group to the board
        e.preventDefault()
        const boardClone = deepClone(board)
        boardClone.groups.push(draft)
        updateBoard(boardClone)
        setShowForm(false)
        setDraft(boardService.getEmptyGroup())
    }

    return (
        <div className="group-create">
            {showForm ? (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter list title..."
                        onChange={handleChange}
                        value={draft.title}
                    />
                    <PrimaryBtn className="add-btn" text="Add list" />
                    <SquareIconBtn icon="close" />
                </form>
            ) : (
                <SecondaryBtn
                    className="group-create-btn"
                    icon="add"
                    text="Add another list"
                    onClick={toggleShowForm}
                />
            )}
        </div>
    )
}
