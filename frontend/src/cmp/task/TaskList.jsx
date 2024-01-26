import { useSelector } from 'react-redux'
import { selectDragUpdateInfo } from '../../store/reducers/app.reducer'
import { TaskPreview } from '../task/TaskPreview'
import { TaskCreate } from './TaskCreate'

const TASK_CREATE_FORM = 'task-create-form'
const TASK_DRAG_PLACEHOLDER = 'task-drag-placeholder'

export function TaskList(props) {
    const { taskCreateFormPosition, group } = props
    const dragUpdateInfo = useSelector(selectDragUpdateInfo)

    function getDragDestinationIdx() {
        if (
            !dragUpdateInfo ||
            dragUpdateInfo.destination.droppableId !== group._id
        ) {
            return null
        }

        const { source, destination } = dragUpdateInfo

        let res = destination.index
        if (
            destination.droppableId === source.droppableId &&
            source.index <= destination.index
        ) {
            // drag/dropping in the same container affects the placeholder index
            res++
        }
        return res
    }

    const dragDestinationIdx = getDragDestinationIdx()
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
            height: getPlaceholderHeight(),
        })
    }

    function getPlaceholderHeight() {
        return '100px'
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
                    style={{ height: item.height }}
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
