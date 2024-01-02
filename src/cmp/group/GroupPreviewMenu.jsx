import { deleteGroup } from '../../store/actions/board.actions'

export function GroupPreviewMenu({ board, group, onClose, onTaskCreate }) {
    function onDelete() {
        try {
            deleteGroup(board, group)
            onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onAddCard() {
        onTaskCreate()
        onClose()
    }
    function onCopyList() {}

    function onMoveList() {}

    function onMoveAllCards() {}

    function onArchiveAllCards() {}

    function onArchiveList() {}

    return (
        <div className="group-preview-menu">
            <ul>
                <li className="clickable" onClick={onAddCard}>
                    Add Card
                </li>
                <li className="clickable" onClick={onCopyList}>
                    Copy list
                </li>
                <li className="clickable" onClick={onMoveList}>
                    Move list
                </li>
                <li>
                    <hr />
                </li>
                <li className="clickable" onClick={onMoveAllCards}>
                    Move all cards in this list
                </li>
                <li className="clickable" onClick={onArchiveAllCards}>
                    Archive all cards in this list
                </li>
                <li>
                    <hr />
                </li>
                <li className="clickable" onClick={onArchiveList}>
                    Archive this list
                </li>
            </ul>
        </div>
    )
}
