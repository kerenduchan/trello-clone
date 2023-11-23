import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { BoardDetailsMenuItem } from './BoardDetailsMenuItem'
import { BoardDelete } from './BoardDelete'
import { hideModal, toggleModal } from '../../store/actions/app.actions'

export function BoardDetailsMenu({ board, onClose }) {
    function onDeleteBoardClick() {
        toggleModal(
            `app-header-delete-board`,
            'Delete Board?',
            <BoardDelete board={board} onClose={hideModal} />,
            'board-delete'
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
