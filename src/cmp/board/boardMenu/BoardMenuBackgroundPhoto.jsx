import { UnsplashImages } from '../../general/UnsplashImages'

export function BoardMenuBackgroundPhoto({ board }) {
    return (
        <div className="board-menu-background-photo">
            <UnsplashImages query="cat" />
        </div>
    )
}
