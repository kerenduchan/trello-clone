import { Link } from 'react-router-dom'
import { PrimaryBtn } from './general/btn/PrimaryBtn'
import { BoardCreate } from './board/BoardCreate'
import { hidePopover, togglePopover } from '../store/actions/app.actions'

export function AppHeader() {
    function onCreateBoardClick(e) {
        togglePopover(
            `app-header-create-board`,
            'Create Board',
            <BoardCreate onClose={hidePopover} />,
            'board-create',
            e
        )
    }

    return (
        <header className="app-header">
            <img className="logo" src="krello.svg" />

            <Link to="/boards">Boards</Link>
            <PrimaryBtn
                text="Create Board"
                onClick={onCreateBoardClick}
            ></PrimaryBtn>
            <div className="avatar">{'<User Avatar>'}</div>
        </header>
    )
}
