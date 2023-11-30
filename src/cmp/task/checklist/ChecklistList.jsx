import { Checklist } from './Checklist'

export function ChecklistList({ hierarchy }) {
    const { task } = hierarchy
    return (
        <div className="checklist-list">
            {task.checklists && (
                <ol>
                    {task.checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <Checklist
                                hierarchy={hierarchy}
                                checklist={checklist}
                            />
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
