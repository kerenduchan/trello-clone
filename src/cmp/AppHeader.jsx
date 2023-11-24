import { Link } from 'react-router-dom'
import { PrimaryBtn } from './general/btn/PrimaryBtn'
import { BoardCreate } from './board/BoardCreate'
import { hidePopover, togglePopover } from '../store/actions/app.actions'

export function AppHeader() {
    function onCreateBoardClick(e) {
        togglePopover({
            event: e,
            el: e.currentTarget,
            title: 'Create Board',
            content: <BoardCreate onClose={hidePopover} />,
            className: 'board-create',
        })
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
