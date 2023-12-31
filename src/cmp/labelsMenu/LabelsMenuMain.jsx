import { useEffect, useState } from 'react'
import { LabelsMenuMainItem } from './LabelsMenuMainItem'

export function LabelsMenuMain({ hierarchy, onEdit, onCreate }) {
    const { board } = hierarchy

    const [filteredLabels, setFilteredLabels] = useState(board.labels)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        const pattern = new RegExp(searchString, 'i')
        const res = board.labels.filter(
            (label) =>
                pattern.test(label.title) || pattern.test(label.color.name)
        )
        setFilteredLabels(res)
    }, [searchString])

    function handleFilterChange(e) {
        setSearchString(e.target.value)
    }

    return (
        <div className="labels-menu-main">
            <input
                placeholder="Search labels..."
                value={searchString}
                onChange={handleFilterChange}
            />
            <h3 className="title">Labels</h3>

            <ul>
                {filteredLabels.map((label) => (
                    <li key={label._id}>
                        <LabelsMenuMainItem
                            hierarchy={hierarchy}
                            label={label}
                            onEdit={onEdit}
                        />
                    </li>
                ))}
            </ul>
            <button className="btn-secondary-centered" onClick={onCreate}>
                Create a new label
            </button>
        </div>
    )
}
