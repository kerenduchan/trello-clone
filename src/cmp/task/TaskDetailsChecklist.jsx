import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskDetailsChecklistItem } from './TaskDetailsChecklistItem'
import { ProgressBar } from '../general/ProgressBar'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'

export function TaskDetailsChecklist({ checklist }) {
    function getPercent() {
        const doneCount = checklist.items.reduce((acc, item) => {
            return acc + (item.isDone ? 1 : 0)
        }, 0)
        return Math.round((100 * doneCount) / checklist.items.length)
    }
    return (
        <div className="task-details-checklist">
            <TaskDetailsSubsectionHeader
                icon="checklist"
                title={checklist.title}
            >
                <SecondaryBtn className="title-btn" text="Delete" />
            </TaskDetailsSubsectionHeader>

            <div className="content">
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
        </div>
    )
}
