import { Link } from 'react-router-dom'
import { usePopoverState } from '../customHooks/usePopoverState'
import { PrimaryBtn } from './general/btn/PrimaryBtn'
import { BoardCreate } from './board/BoardCreate'
import { PopoverMenu } from './general/PopoverMenu'

export function AppHeader() {
    const createBoardMenu = usePopoverState()

    return (
        <>
            <header className="app-header">
                <img className="logo" src="krello.svg" />

                <Link to="/boards">Boards</Link>
                <PrimaryBtn
                    {...createBoardMenu.triggerAndTarget}
                    text="Create Board"
                ></PrimaryBtn>
                <div className="avatar">{'<User Avatar>'}</div>
            </header>

            {/* Create Board menu */}
            {createBoardMenu.show && (
                <PopoverMenu title="Create Board" {...createBoardMenu.popover}>
                    <BoardCreate onClose={createBoardMenu.onClose} />
                </PopoverMenu>
            )}
        </>
    )
}
