import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return (
        <div className="board-preview">
            <Link to={`/b/${board._id}`}>{board.title}</Link>
        </div>
    )
}
