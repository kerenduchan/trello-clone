import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getBoards } from '../util'
import { CreateBoard } from '../cmp/CreateBoard'

export function BoardIndex() {
    const params = useParams()
    const [showCreateBoardDialog, setShowCreateBoardDialog] = useState(false)

    function onCreateBoardClick() {
        // setShowCreateBoardDialog(true)
    }

    return (
        <div id="board-index">
            <h1>{params.userId}'s Boards</h1>
            {/* <button className="primary-btn" onClick={onCreateBoardClick}>
                Create Board
            </button> */}
            <ul>
                {getBoards().map((b) => (
                    <li key={b._id}>
                        <Link to={`/b/${b._id}`}>{b.name}</Link>
                    </li>
                ))}
            </ul>

            {showCreateBoardDialog && <CreateBoard />}
        </div>
    )
}
