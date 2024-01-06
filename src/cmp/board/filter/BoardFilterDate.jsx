import { Icon } from '../../general/Icon'

export function BoardFilterDate({ board, filter, onChange }) {
    const items = [
        {
            id: 'notDue',
            label: 'No dates',
            isChecked: () => filter.notDue,
            icon: 'calendar',
        },
        {
            id: 'overdue',
            label: 'Overdue',
            isChecked: () => filter.overdue,
            icon: 'schedule',
        },
        {
            id: 'day',
            label: 'Due in the next day',
            isChecked: () => filter.due === 'day',
            icon: 'schedule',
        },
        {
            id: 'week',
            label: 'Due in the next week',
            isChecked: () => filter.due === 'week',
            icon: 'schedule',
        },
        {
            id: 'month',
            label: 'Due in the next month',
            isChecked: () => filter.due === 'month',
            icon: 'schedule',
        },
        {
            id: 'complete',
            label: 'Marked as complete',
            isChecked: () => filter.complete === true,
        },
        {
            id: 'notComplete',
            label: 'Not marked as complete',
            isChecked: () => filter.complete === false,
        },
    ]

    function onClick(id) {
        switch (id) {
            case 'notDue':
            case 'overdue':
                onChange({ [id]: !filter[id] })
                break
            case 'day':
            case 'week':
            case 'month':
                onChange({ due: filter.due === id ? null : id })
                break
            case 'complete':
            case 'notComplete':
                const val = id === 'complete' ? true : false
                onChange({ complete: filter.complete === val ? null : val })
                break
        }
    }

    if (!filter) return <></>

    return (
        <div className="board-filter-date">
            <ul>
                {items.map(({ id, label, icon, isChecked }) => (
                    <li key={id} className="field" onClick={() => onClick(id)}>
                        <input
                            type="checkbox"
                            name={id}
                            value={id}
                            onChange={() => {}}
                            checked={isChecked()}
                        />
                        <span className="field-content">
                            {icon && (
                                <span className={`icon-bg icon-bg-${id}`}>
                                    <Icon type={icon} />
                                </span>
                            )}
                            <span className="label">{label}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
