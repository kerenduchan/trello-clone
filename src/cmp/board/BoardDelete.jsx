import { useNavigate } from 'react-router'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { removeBoard } from '../../store/actions/board.actions'

export function BoardDelete({ board, onClose }) {
    const navigate = useNavigate()

    async function onDeleteBoard() {
        await removeBoard(board._id)
        onClose()
        navigate('/boards')
    }

    return (
        <div className="board-delete">
            <p>
                All lists, cards and actions will be deleted, and you won’t be
                able to re-open the board. There is no undo.
            </p>
            <PrimaryBtn
                className="delete-btn danger"
                text="Delete"
                onClick={onDeleteBoard}
            />
        </div>
    )
}
