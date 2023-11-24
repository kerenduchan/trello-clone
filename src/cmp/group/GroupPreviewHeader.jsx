import { togglePopover } from '../../store/actions/app.actions'
import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { GroupPreviewMenu } from './GroupPreviewMenu'

export function GroupPreviewHeader({ group, board }) {
    function onTitleChange(title) {
        // change the title of this group in the board
        const boardClone = deepClone(board)
        const groupClone = boardClone.groups.filter(
            (g) => g._id === group._id
        )[0]
        groupClone.title = title
        updateBoard(boardClone)
    }

    function onMoreClick(e) {
        togglePopover(
            `group-preview-${group._id}`,
            'List Actions',
            <GroupPreviewMenu board={board} group={group} />,
            'list-actions',
            e
        )
    }

    return (
        <header className="group-preview-header">
            <EditableTitle title={group.title} onChange={onTitleChange} />
            <SquareIconBtn
                className="more-btn"
                icon="more"
                onClick={onMoreClick}
            />
        </header>
    )
}
