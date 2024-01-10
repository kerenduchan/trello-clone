import { UnsplashImages } from '../../general/UnsplashImages'
import { updateBoard } from '../../../store/actions/board.actions'
import { utilService } from '../../../services/util.service'

export function BoardMenuBackgroundPhoto({ board }) {
    async function onImageClick(image) {
        const theme = await utilService.getImageTheme(image.urls.thumb)
        await updateBoard(board, {
            style: {
                backgroundImage: image.urls.regular,
                theme,
            },
        })
    }

    return (
        <div className="board-menu-background-photo">
            <UnsplashImages query="cat" onImageClick={onImageClick} />
        </div>
    )
}
