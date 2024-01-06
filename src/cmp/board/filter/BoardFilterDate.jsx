export function BoardFilterDate({ board, filter, onChange }) {
    const items = [
        { id: 'notDue', label: 'No dates', isChecked: () => filter.notDue },
        { id: 'overdue', label: 'Overdue', isChecked: () => filter.overdue },
        {
            id: 'day',
            label: 'Due in the next day',
            isChecked: () => filter.due === 'day',
        },
        {
            id: 'week',
            label: 'Due in the next week',
            isChecked: () => filter.due === 'week',
        },
        {
            id: 'month',
            label: 'Due in the next month',
            isChecked: () => filter.due === 'month',
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

    function isChecked(id) {
        return items.find((item) => item.id === id).isChecked()
    }

    if (!filter) return <></>

    return (
        <div className="board-filter-due-date">
            {items.map(({ id, label }) => (
                <div key={id} className="field" onClick={() => onClick(id)}>
                    <input
                        type="checkbox"
                        name={id}
                        value={id}
                        onChange={() => {}}
                        checked={isChecked(id)}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
            ))}
        </div>
    )
}
