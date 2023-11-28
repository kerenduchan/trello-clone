import { Checklist } from './Checklist'

export function ChecklistList({ board, group, task }) {
    return (
        <div className="checklist-list">
            {task.checklists && (
                <ol>
                    {task.checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <Checklist
                                board={board}
                                group={group}
                                task={task}
                                checklist={checklist}
                            />
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
