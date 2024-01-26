import { TaskPreview } from '../task/TaskPreview'
import { TaskCreate } from './TaskCreate'

const TASK_CREATE_FORM = 'task-create-form'
const TASK_DRAG_PLACEHOLDER = 'task-drag-placeholder'

export function TaskList(props) {
    const { taskCreateFormPosition, dragDestinationIdx, group } = props
    console.log(dragDestinationIdx)
    const listItems = group.tasks.map((task, index) => ({
        _id: task._id,
        task,
        index,
    }))

    if (taskCreateFormPosition !== null) {
        listItems.splice(taskCreateFormPosition, 0, {
            _id: TASK_CREATE_FORM,
        })
    }

    if (dragDestinationIdx !== null) {
        listItems.splice(dragDestinationIdx, 0, {
            _id: TASK_DRAG_PLACEHOLDER,
        })
    }

    return (
        <ol className="task-list">
            {listItems.map((item) => (
                <li key={item._id}>
                    <TaskListItem item={item} {...props} />
                </li>
            ))}
        </ol>
    )
}

function TaskListItem({
    item,
    board,
    group,
    taskCreateFormPosition,
    onCloseTaskCreateForm,
    onCreateTask,
}) {
    switch (item._id) {
        case TASK_CREATE_FORM:
            return (
                <TaskCreate
                    board={board}
                    group={group}
                    position={taskCreateFormPosition}
                    onCreate={onCreateTask}
                    onClose={onCloseTaskCreateForm}
                />
            )

        case TASK_DRAG_PLACEHOLDER:
            return (
                <div
                    className="task-drag-placeholder"
                    style={{ height: '100px' }}
                />
            )

        default:
            return (
                <TaskPreview
                    hierarchy={{ board, group, task: item.task }}
                    index={item.index}
                />
            )
    }
}
