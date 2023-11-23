import { Icon } from '../general/Icon'
import { CircleBtn } from '../general/btn/CircleBtn'
import { EditableTitle } from '../general/EditableTitle'
import { deepClone } from '../../util'
import { updateBoard } from '../../store/actions/board.actions'

export function TaskDetailsHeader({ board, group, task, onClose }) {
    function onTitleChange(title) {
        // update the title of this task in the group in the board
        const boardClone = deepClone(board)
        const groupClone = boardClone.groups.filter(
            (g) => g._id === group._id
        )[0]
        const taskClone = groupClone.tasks.filter((t) => t._id === task._id)[0]
        taskClone.title = title
        updateBoard(boardClone)
    }

    return (
        <>
            <CircleBtn type="close" onClick={onClose} />
            {task.cover && (
                <div
                    className="cover"
                    style={{
                        backgroundColor: task.cover.bgColor,
                    }}
                ></div>
            )}

            <div className="task-details-header">
                <Icon type="card" />
                <EditableTitle title={task.title} onChange={onTitleChange} />
                <p className="subtitle">
                    in list <span className="group-title">{group.title}</span>
                </p>
            </div>
        </>
    )
}
