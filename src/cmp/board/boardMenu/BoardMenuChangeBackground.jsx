export function BoardMenuChangeBackground({ onPhotosClick, onColorsClick }) {
    return (
        <div className="board-menu-change-background">
            <div className="photos-and-colors">
                {/* Photos */}
                <button className="btn-submenu" onClick={onPhotosClick}>
                    <div className="image image-photos" />
                    <div className="label">Photos</div>
                </button>

                {/* Colors */}
                <button className="btn-submenu" onClick={onColorsClick}>
                    <div className="image image-colors" />
                    <div className="label">Colors</div>
                </button>
            </div>
        </div>
    )
}
