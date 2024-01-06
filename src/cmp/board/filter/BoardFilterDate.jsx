export function BoardFilterDate({ board, date, onChange }) {
    const items = [
        { id: 'no-dates', label: 'No dates' },
        { id: 'overdue', label: 'Overdue' },
        { id: 'day', label: 'Due in the next day' },
        { id: 'week', label: 'Due in the next week' },
        { id: 'month', label: 'Due in the next month' },
        { id: 'complete', label: 'Marked as complete' },
        { id: 'not-complete', label: 'Not marked as complete' },
    ]

    const checkboxGroups = [
        ['day', 'week', 'month'],
        ['complete', 'not-complete'],
    ]

    function onClick(key) {
        const res = new Set(date)

        if (res.has(key)) {
            // changed from checked to unchecked
            res.delete(key)

            onChange(res)
            return
        }

        // changed from unchecked to checked
        const checkboxGroup = checkboxGroups.find((g) => g.includes(key))
        if (checkboxGroup?.includes(key)) {
            // there can be only one
            checkboxGroup.forEach((item) => res.delete(item))
        }

        res.add(key)
        onChange(res)
    }

    if (!date) return <></>

    return (
        <div className="board-filter-due-date">
            {items.map(({ id, label }) => (
                <div key={id} className="field" onClick={() => onClick(id)}>
                    <input
                        type="checkbox"
                        name={id}
                        value={id}
                        onChange={() => {}}
                        checked={date.has(id)}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
            ))}
        </div>
    )
}
