import { boardService } from '../../../services/board.service'

export function BoardMenuBackgroundColor() {
    const colors = boardService.getBackgroundColors()

    return (
        <div className="board-menu-background-color">
            {colors.map((color) => (
                <button
                    className="color"
                    style={{ backgroundColor: color }}
                ></button>
            ))}
        </div>
    )
}
