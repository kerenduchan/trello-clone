import { Link } from 'react-router-dom'
import { Icon } from '../general/Icon'
import { updateBoard } from '../../store/actions/board.actions'

export function BoardPreview({ board }) {
    function onStarClick() {
        try {
            updateBoard(board, { isStarred: !board.isStarred })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div
            className="board-preview"
            style={{
                backgroundImage: `url(${board.style?.backgroundImage})`,
            }}
        >
            <div className="board-preview-contents">
                <h1 className="board-title">{board.title}</h1>
                <Link to={`/b/${board._id}`} className="link"></Link>

                <Icon
                    className={`star ${
                        board.isStarred ? 'starred' : 'unstarred'
                    }`}
                    type="star"
                    full={board.isStarred}
                    onClick={onStarClick}
                />
            </div>
        </div>
    )
}
