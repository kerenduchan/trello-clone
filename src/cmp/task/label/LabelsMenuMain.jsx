import { LabelsMenuMainItem } from './LabelsMenuMainItem'

export function LabelsMenuMain({ hierarchy, onEditClick }) {
    const { board } = hierarchy
    return (
        <div className="labels-menu-main">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <LabelsMenuMainItem
                            hierarchy={hierarchy}
                            label={label}
                            onEditClick={onEditClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
