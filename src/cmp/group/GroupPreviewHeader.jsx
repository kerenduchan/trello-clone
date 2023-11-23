import { toggleModal } from '../../store/actions/app.actions'
import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { GroupPreviewMenu } from './GroupPreviewMenu'

export function GroupPreviewHeader({ group, board }) {
    function onTitleChange(title) {
        group.title = title
        updateBoard(board)
    }

    function onMoreClick() {
        toggleModal(
            `group-preview-${group._id}`,
            'List Actions',
            <GroupPreviewMenu board={board} group={group} />,
            'list-actions'
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
