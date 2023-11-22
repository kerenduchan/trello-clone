import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { BoardDetailsMenuItem } from './BoardDetailsMenuItem'
import { useToggle } from '../../customHooks/useToggle'
import { Popover } from '../general/Popover'
import { BoardDelete } from './BoardDelete'

export function BoardDetailsMenu({ board, onClose }) {
    const [
        showDeleteBoardPopover,
        toggleShowDeleteBoardPopover,
        setShowDeleteBoardPopover,
    ] = useToggle()

    return (
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
                            icon="remove"
                            title="Close Board"
                            onClick={() => toggleShowDeleteBoardPopover()}
                        />
                    </li>
                </ul>
            </div>
            {showDeleteBoardPopover && (
                <Popover
                    title="Delete Board?"
                    onClose={() => setShowDeleteBoardPopover(false)}
                >
                    <BoardDelete board={board} />
                </Popover>
            )}
        </div>
    )
}
