import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'
import { useNavigate } from 'react-router'
import { boardService } from '../../services/board.service'

export function TaskDelete({ board, group, task, onClose }) {
    const navigate = useNavigate()

    async function onDeleteTask() {
        // remove this task from the group in the board
        const boardClone = deepClone(board)
        const groupClone = boardService.getGroupById(boardClone, group._id)
        groupClone.tasks = groupClone.tasks.filter((t) => t._id !== task._id)
        updateBoard(boardClone)
        onClose()
        navigate(`/b/${board._id}`)
    }

    return (
        <div className="task-delete">
            <p>
                All actions will be removed from the activity feed and you won't
                be able to re-open the card. There is no undo.
            </p>
            <PrimaryBtn
                className="delete-btn danger"
                text="Delete"
                onClick={onDeleteTask}
            />
        </div>
    )
}
