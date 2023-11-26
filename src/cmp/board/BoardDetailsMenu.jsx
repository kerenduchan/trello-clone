import { usePopoverState } from '../../customHooks/usePopoverState'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { BoardDetailsMenuItem } from './BoardDetailsMenuItem'
import { BoardDelete } from './BoardDelete'
import { PopoverMenu } from '../general/PopoverMenu'

export function BoardDetailsMenu({ board, onClose }) {
    const deleteBoardMenu = usePopoverState()

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
            {/* Delete Board menu */}
            {deleteBoardMenu.show && (
                <PopoverMenu title="Delete Board?" {...deleteBoardMenu.popover}>
                    <BoardDelete
                        board={board}
                        onClose={deleteBoardMenu.onClose}
                    />
                </PopoverMenu>
            )}
        </>
    )
}
