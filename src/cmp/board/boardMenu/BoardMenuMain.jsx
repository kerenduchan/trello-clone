import { deleteBoard } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { DeleteMenu } from '../../general/DeleteMenu'
import { useNavigate } from 'react-router'

export function BoardMenuMain({ board, onArchive }) {
    const navigate = useNavigate()
    const deleteBoardMenu = usePopoverState()

    async function onDeleteBoard() {
        await deleteBoard(board)
        navigate('/boards')
    }

    return (
        <div className="board-menu-main">
            <ul className="board-menu-main-list">
                {/* Archived items */}
                <li onClick={onArchive}>
                    <Icon type="archive" />
                    <div className="title"> Archived items</div>
                </li>

                <hr />

                {/* Delete Board */}
                <li {...deleteBoardMenu.triggerAndTarget}>
                    <Icon type="remove" />
                    <div className="title"> Delete board</div>
                </li>
            </ul>

            {/* Delete board menu */}
            {deleteBoardMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteBoardMenu}
                    title="Delete board?"
                    text="All lists, cards and actions will be deleted, and you won't be able to re-open the board. There is no undo."
                    onDelete={onDeleteBoard}
                />
            )}
        </div>
    )
}
