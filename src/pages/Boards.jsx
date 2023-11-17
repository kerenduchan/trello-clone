import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getBoards } from '../util'
import { CreateBoard } from '../cmp/CreateBoard'

export function Boards() {
    const params = useParams()
    const [showCreateBoardDialog, setShowCreateBoardDialog] = useState(false)

    function onCreateBoardClick() {
        // setShowCreateBoardDialog(true)
    }

    return (
        <div id="boards">
            <h1>Boards for {params.userId}</h1>
            <button className="primary-btn" onClick={onCreateBoardClick}>
                Create Board
            </button>
            <ul>
                {getBoards().map((b) => (
                    <li key={b._id}>
                        <Link to={`/b/${b._id}/${b.slug}`}>{b.name}</Link>
                    </li>
                ))}
            </ul>

            {showCreateBoardDialog && <CreateBoard />}
        </div>
    )
}
