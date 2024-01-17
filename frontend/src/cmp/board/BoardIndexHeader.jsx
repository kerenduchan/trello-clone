import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { boardService } from '../../services/board/board.service'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { BoardCreate } from './BoardCreate'
import { UserAccountMenu } from '../user/UserAccountMenu'
import { selectLoggedinUser } from '../../store/reducers/app.reducer'

export function BoardIndexHeader({ board }) {
    const navigate = useNavigate()
    const loggedinUser = useSelector(selectLoggedinUser)
    const createBoardMenu = usePopoverState()
    const userAccountMenu = usePopoverState()

    function onLogoClick() {
        navigate('/')
    }

    function getLogo() {
        if (boardService.getBoardTheme(board) === 'light') {
            return 'krello.svg'
        }
        return 'krello-white.svg'
    }

    function getImgUrl() {
        return loggedinUser?.imgUrl || '/images/no-avatar.svg'
    }
    return (
        <>
            <header className="board-index-header">
                <button className="btn-dynamic" onClick={onLogoClick}>
                    <img className="logo" src={getLogo()} />
                </button>

                <Link to="/boards" className="btn-dynamic-wide">
                    Boards
                </Link>
                <button
                    className={`btn-dynamic-wide btn-create-board ${
                        createBoardMenu.show ? 'active' : ''
                    }`}
                    {...createBoardMenu.triggerAndTarget}
                >
                    Create Board
                </button>
                <button
                    className="user-avatar"
                    {...userAccountMenu.triggerAndTarget}
                >
                    <img src={getImgUrl()} />
                </button>
            </header>

            {/* Create Board menu */}
            {createBoardMenu.show && (
                <BoardCreate popoverState={createBoardMenu} />
            )}

            {/* User account menu */}
            {userAccountMenu.show && (
                <UserAccountMenu popover={userAccountMenu.popover} />
            )}
        </>
    )
}
