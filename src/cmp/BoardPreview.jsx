import { Link } from 'react-router-dom'

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
                <button className="star">
                    <img src="images/star-white.svg" />
                </button>
            </div>
        </Link>
    )
}
