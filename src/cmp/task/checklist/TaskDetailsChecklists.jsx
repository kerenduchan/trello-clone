import { TaskDetailsChecklist } from './TaskDetailsChecklist'

export function TaskDetailsChecklists({ board, group, task }) {
    return (
        <div className="task-details-checklists">
            {task.checklists && (
                <ol>
                    {task.checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <TaskDetailsChecklist
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
