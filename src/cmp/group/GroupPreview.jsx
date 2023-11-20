import { Icon } from '../general/Icon'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { TaskList } from '../task/TaskList'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
    return (
        <section className="group-preview">
            <header className="header">
                <h2>{group.title}</h2>
                <SquareIconBtn className="more-btn" icon="more" />
            </header>

            <TaskList board={board} tasks={group.tasks} />
            <div className="footer">
                <button className="add-btn">
                    <Icon type="add"></Icon>
                    <span>Add a card</span>
                </button>
                <SquareIconBtn className="template-btn" icon="template" />
            </div>
        </section>
    )
}
