import { useSelector } from 'react-redux'
import { boardService } from '../../../services/board.service'
import { selectBoard } from '../../../store/reducers/board.reducer'
import { updateBoard } from '../../../store/actions/board/board.actions'
import { Icon } from '../../general/Icon'

export function BoardMenuBackgroundColor() {
    const board = useSelector(selectBoard)

    function onSelect(color) {
        updateBoard(board, { style: { backgroundColor: color } })
    }

    const colors = boardService.getBackgroundColors()

    return (
        <div className="board-menu-background-color">
            {colors.map(({ _id, color }) => (
                <button
                    key={_id}
                    className="btn-color"
                    style={{ backgroundColor: color }}
                    onClick={() => onSelect(color)}
                >
                    {board.style.backgroundColor === color && (
                        <Icon type="check" />
                    )}
                </button>
            ))}
        </div>
    )
}
