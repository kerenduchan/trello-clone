import { Checklist } from './Checklist'

export function Checklists({ checklists }) {
    return (
        <div className="task-details-checklists">
            {checklists && (
                <ol>
                    {checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <Checklist checklist={checklist} />
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
