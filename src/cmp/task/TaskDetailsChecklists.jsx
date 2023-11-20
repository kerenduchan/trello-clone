import { TaskDetailsChecklist } from './TaskDetailsChecklist'

export function TaskDetailsChecklists({ checklists }) {
    return (
        <div className="task-details-checklists">
            {checklists && (
                <ol>
                    {checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <TaskDetailsChecklist checklist={checklist} />
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
