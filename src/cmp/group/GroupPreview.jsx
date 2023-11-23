import { toggleModal } from '../../store/actions/app.actions'
import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { TaskList } from '../task/TaskList'
import { GroupPreviewFooter } from './GroupPreviewFooter'
import { GroupPreviewMenu } from './GroupPreviewMenu'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
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
        <section className="group-preview">
            <header className="header">
                <EditableTitle title={group.title} onChange={onTitleChange} />
                <SquareIconBtn
                    className="more-btn"
                    icon="more"
                    onClick={onMoreClick}
                />
            </header>

            <TaskList board={board} tasks={group.tasks} />
            <GroupPreviewFooter board={board} group={group} />
        </section>
    )
}
