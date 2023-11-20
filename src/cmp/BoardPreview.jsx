import { Link } from 'react-router-dom'
import { Icon } from './general/Icon'

export function BoardPreview({ board }) {
    return (
        <Link
            to={`/b/${board._id}`}
            className="board-preview"
            style={{
                backgroundImage: `url(${board.style.backgroundImage})`,
            }}
        >
            <div className="board-preview-contents">
                <h1 className="board-title">{board.title}</h1>
                <Icon className="star" type="star" />
            </div>
        </Link>
    )
}
