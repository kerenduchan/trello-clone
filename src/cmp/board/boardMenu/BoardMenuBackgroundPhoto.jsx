import { UnsplashImages } from '../../general/UnsplashImages'
import { updateBoard } from '../../../store/actions/board.actions'

export function BoardMenuBackgroundPhoto({ board }) {
    function onImageClick(image) {
        updateBoard(board, { style: { backgroundImage: image.urls.regular } })
    }

    return (
        <div className="board-menu-background-photo">
            <UnsplashImages query="cat" onImageClick={onImageClick} />
        </div>
    )
}
