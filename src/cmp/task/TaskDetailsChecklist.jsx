import { Icon } from '../general/Icon'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskDetailsChecklistItem } from './TaskDetailsChecklistItem'
import { ProgressBar } from '../general/ProgressBar'

export function TaskDetailsChecklist({ checklist }) {
    function getPercent() {
        const doneCount = checklist.items.reduce((acc, item) => {
            return acc + (item.isDone ? 1 : 0)
        }, 0)
        return Math.round((100 * doneCount) / checklist.items.length)
    }
    return (
        <div className="task-details-checklist">
            <Icon type="checklist" size="md" />
            <h2 className="title">{checklist.title}</h2>
            <SecondaryBtn className="title-btn" text="Delete" />
            <ProgressBar percent={getPercent()} />

            <ol className="items">
                {checklist.items.map((item) => (
                    <li key={item._id}>
                        <TaskDetailsChecklistItem item={item} />
                    </li>
                ))}
            </ol>
            <SecondaryBtn className="add-btn" text="Add an item" />
        </div>
    )
}
