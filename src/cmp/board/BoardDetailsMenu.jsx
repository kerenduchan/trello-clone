import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { BoardDetailsMenuItem } from './BoardDetailsMenuItem'
import { BoardDelete } from './BoardDelete'
import { hidePopover, togglePopover } from '../../store/actions/app.actions'

export function BoardDetailsMenu({ board, onClose }) {
    function onDeleteBoardClick(e) {
        togglePopover(
            `app-header-delete-board`,
            'Delete Board?',
            <BoardDelete board={board} onClose={hidePopover} />,
            'board-delete',
            e
        )
    }

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
                            onClick={onDeleteBoardClick}
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}
