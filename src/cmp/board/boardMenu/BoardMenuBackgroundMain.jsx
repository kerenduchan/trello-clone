import { Icon } from '../../general/Icon'

export function BoardMenuBackgroundMain({ onPhotosClick, onColorsClick }) {
    function onAdd() {}

    return (
        <div className="board-menu-background-main">
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

            <hr />

            {/* Custom */}
            <h2 className="custom-title">Custom</h2>
            <div className="custom-backgrounds">
                <button
                    className="btn-secondary-centered btn-add"
                    onClick={onAdd}
                >
                    <Icon type="add" />
                </button>
            </div>
        </div>
    )
}
