import { Icon } from '../general/Icon'
import { CircleBtn } from '../general/btn/CircleBtn'
import { EditableTitle } from '../general/EditableTitle'
import { deepClone } from '../../util'
import { updateBoard } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'

export function TaskDetailsHeader({ board, group, task, onClose }) {
    function onTitleChange(title) {
        // update the title of this task in the group in the board
        const boardClone = deepClone(board)
        const taskClone = boardService.getTaskById(
            boardClone,
            group._id,
            task._id
        )
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
