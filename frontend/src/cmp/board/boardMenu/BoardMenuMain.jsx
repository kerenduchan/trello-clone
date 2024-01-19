import { deleteBoard } from '../../../store/actions/board/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { DeleteMenu } from '../../general/DeleteMenu'
import { useNavigate } from 'react-router'

export function BoardMenuMain({
    board,
    onActivity,
    onArchive,
    onChangeBackground,
}) {
    const navigate = useNavigate()
    const deleteBoardMenu = usePopoverState()

    async function onDeleteBoard() {
        await deleteBoard(board)
        navigate('/boards')
    }

    function getChangeBackgroundStyle() {
        if (board.style.backgroundColor) {
            return { backgroundColor: board.style.backgroundColor }
        } else if (board.style.backgroundImage) {
            return { backgroundImage: `url(${board.style.backgroundImage})` }
        }
        return {}
    }

    return (
        <div className="board-menu-main">
            <ul className="board-menu-main-list">
                {/* Activity */}
                <li onClick={onActivity}>
                    <Icon type="list" />
                    <div className="title"> Activity</div>
                </li>

                {/* Archived items */}
                <li onClick={onArchive}>
                    <Icon type="archive" />
                    <div className="title"> Archived items</div>
                </li>

                <hr />

                {/* Change background */}
                <li onClick={onChangeBackground}>
                    <span
                        className="icon change-background"
                        style={getChangeBackgroundStyle()}
                    />
                    <div className="title"> Change background</div>
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
