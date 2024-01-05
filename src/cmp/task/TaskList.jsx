import { TaskPreview } from '../task/TaskPreview'
import { TaskCreate } from './TaskCreate'

export function TaskList({
    board,
    group,
    taskCreateFormPosition,
    onCloseTaskCreateForm,
    onCreateTask,
}) {
    const TASK_CREATE_FORM_PLACEHOLDER = 'task-create-form'

    const listItems = group.tasks
        .filter((task) => !task.archivedAt)
        .map((task, index) => ({ _id: task._id, task, index }))

    if (taskCreateFormPosition !== null) {
        listItems.splice(taskCreateFormPosition, 0, {
            _id: TASK_CREATE_FORM_PLACEHOLDER,
        })
    }

    return (
        <ol className="task-list">
            {listItems.map((item) => (
                <li key={item._id}>
                    {item._id === TASK_CREATE_FORM_PLACEHOLDER ? (
                        <TaskCreate
                            board={board}
                            group={group}
                            position={taskCreateFormPosition}
                            onCreate={onCreateTask}
                            onClose={onCloseTaskCreateForm}
                        />
                    ) : (
                        <TaskPreview
                            hierarchy={{ board, group, task: item.task }}
                            index={item.index}
                        />
                    )}
                </li>
            ))}
        </ol>
    )
}
