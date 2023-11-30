import { TaskList } from '../task/TaskList'
import { GroupPreviewFooter } from './GroupPreviewFooter'
import { GroupPreviewHeader } from './GroupPreviewHeader'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
    return (
        <section className="group-preview">
            <GroupPreviewHeader board={board} group={group} />
            <TaskList board={board} group={group} />
            <GroupPreviewFooter board={board} group={group} />
        </section>
    )
}
