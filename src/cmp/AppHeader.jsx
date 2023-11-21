import { useToggle } from '../customHooks/useToggle'
import { PrimaryBtn } from './general/btn/PrimaryBtn'
import { BoardCreate } from './board/BoardCreate'

export function AppHeader() {
    const [
        showCreateBoardPopover,
        toggleShowCreateBoardPopover,
        setShowCreateBoardPopover,
    ] = useToggle()

    return (
        <>
            <header className="app-header">
                <div className="logo">{'<Krello Logo>'}</div>
                <PrimaryBtn
                    text="Create Board"
                    onClick={() => toggleShowCreateBoardPopover()}
                ></PrimaryBtn>
                <div className="avatar">{'<User Avatar>'}</div>
            </header>
            {showCreateBoardPopover && (
                <BoardCreate onClose={() => setShowCreateBoardPopover(false)} />
            )}
        </>
    )
}
