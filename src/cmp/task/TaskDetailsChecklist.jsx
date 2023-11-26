import { Icon } from '../general/Icon'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskDetailsChecklistItem } from './TaskDetailsChecklistItem'

export function TaskDetailsChecklist({ checklist }) {
    return (
        <div className="task-details-checklist">
            <Icon type="checklist" size="md" />
            <h2 className="title">{checklist.title}</h2>
            <SecondaryBtn className="title-btn" text="Delete" />

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
