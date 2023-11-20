import { useState } from 'react'
import { PrimaryBtn } from './general/btn/PrimaryBtn'
import { BoardCreate } from './board/BoardCreate'

export function AppHeader({ user }) {
    const [showCreateBoardPopover, setShowCreateBoardPopover] = useState(false)

    return (
        <>
            <header className="app-header">
                <div className="logo">{'<Krello Logo>'}</div>
                <PrimaryBtn
                    text="Create Board"
                    onClick={() => setShowCreateBoardPopover((prev) => !prev)}
                ></PrimaryBtn>
                <div className="avatar">{'<User Avatar>'}</div>
            </header>
            {showCreateBoardPopover && (
                <BoardCreate onClose={() => setShowCreateBoardPopover(false)} />
            )}
        </>
    )
}
