import { Icon } from './Icon'
import { SecondaryBtn } from './SecondaryBtn'

export function TaskDetailsChecklist({ checklist }) {
    return (
        <div className="task-details-checklist">
            <Icon type="checklist" size="md" />
            <h2 className="title">{checklist.title}</h2>
            <SecondaryBtn className="title-btn" text="Delete" />

            <ol className="items">
                {checklist.items.map((item) => (
                    <li key={item._id}>
                        <input
                            className="item-checkbox"
                            type="checkbox"
                            checked={item.isDone}
                            onChange={() => {}}
                        />
                        <span
                            className={`item-title ${
                                item.isDone ? 'done' : ''
                            }`}
                        >
                            {item.title}
                        </span>
                    </li>
                ))}
            </ol>
            <SecondaryBtn className="add-btn" text="Add an item" />
        </div>
    )
}
