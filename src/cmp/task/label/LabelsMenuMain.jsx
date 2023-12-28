import { useEffect, useState } from 'react'
import { LabelsMenuMainItem } from './LabelsMenuMainItem'

export function LabelsMenuMain({ hierarchy, onEditClick }) {
    const { board } = hierarchy

    const [filteredLabels, setFilteredLabels] = useState(board.labels)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        const pattern = new RegExp(searchString, 'i')
        const res = board.labels.filter(
            (label) =>
                pattern.test(label.title) || pattern.test(label.colorName)
        )
        setFilteredLabels(res)
    }, [searchString])

    function handleFilterChange(e) {
        console.log(e.target.value)
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
                            onEditClick={onEditClick}
                        />
                    </li>
                ))}
            </ul>
            <button className="btn-secondary btn-create">
                Create a new label
            </button>
        </div>
    )
}
