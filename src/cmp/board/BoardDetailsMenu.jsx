import { useNavigate } from 'react-router'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { BoardDetailsMenuItem } from './BoardDetailsMenuItem'
import { DeleteMenu } from '../general/DeleteMenu'
import { removeBoard } from '../../store/actions/board.actions'

export function BoardDetailsMenu({ board, onClose }) {
    const navigate = useNavigate()
    const deleteBoardMenu = usePopoverState()

    async function onDeleteBoard() {
        await removeBoard(board._id)
        deleteBoardMenu.onClose()
        navigate('/boards')
    }

    return (
        <>
            <div className="board-details-menu">
                <header>
                    <div className="title">Menu</div>
                    <SquareIconBtn icon="close" onClick={onClose} />
                    <hr className="divider" />
                </header>

                <div className="content">
                    <ul>
                        <li>
                            <BoardDetailsMenuItem
                                {...deleteBoardMenu.triggerAndTarget}
                                icon="remove"
                                title="Close Board"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Delete board menu */}
            {deleteBoardMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteBoardMenu}
                    title="Delete Board?"
                    text="All lists, cards and actions will be deleted, and you won't be able to re-open the board. There is no undo."
                    onDelete={onDeleteBoard}
                />
            )}
        </>
    )
}
