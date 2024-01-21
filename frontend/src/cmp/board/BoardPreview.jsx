import { Link } from 'react-router-dom'
import { Icon } from '../general/Icon'
import { updateBoard } from '../../store/actions/board/board.actions'
import { boardService } from '../../services/board/board.service'

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
        <div className="board-preview">
            <Link to={`/b/${board._id}`} />
            <div
                className="bg-image"
                style={boardService.getBoardStyle(board)}
            />
            <div className="overlay" />
            <h1 className="title">{board.title}</h1>
            <Icon
                className={`star ${board.isStarred ? 'starred' : 'unstarred'}`}
                type="star"
                size="xs"
                full={board.isStarred}
                onClick={onStarClick}
            />
        </div>
    )
}
