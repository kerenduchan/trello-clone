import { LabelsMenuMainItem } from './LabelsMenuMainItem'

export function LabelsMenuMain({ board, group, task, onEditClick }) {
    return (
        <div className="labels-menu-main">
            <ul>
                {board.labels.map((label) => (
                    <li key={label._id}>
                        <LabelsMenuMainItem
                            board={board}
                            group={group}
                            task={task}
                            label={label}
                            onEditClick={onEditClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
