import { useNavigate } from 'react-router'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { removeBoard } from '../../store/actions/board.actions'

export function BoardDetailsMenu({ board, onClose }) {
    const navigate = useNavigate()

    async function onDeleteBoard() {
        await removeBoard(board._id)
        navigate('/boards')
    }

    return (
        <div className="board-details-menu">
            <SquareIconBtn icon="close" onClick={onClose} />

            <PrimaryBtn text="Delete Board" onClick={onDeleteBoard} />
        </div>
    )
}
