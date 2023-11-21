import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function BoardDetailsMenu({ onClose }) {
    return (
        <div className="board-details-menu">
            <SquareIconBtn icon="close" onClick={onClose} />
        </div>
    )
}
