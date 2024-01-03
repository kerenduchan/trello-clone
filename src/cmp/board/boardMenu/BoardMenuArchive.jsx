import { useEffect, useState } from 'react'
import { boardService } from '../../../services/board.service'
import { updateTask } from '../../../store/actions/board.actions'
import { ArchivedTaskPreview } from './ArchivedTaskPreview'

export function BoardMenuArchive({ board }) {
    // tasks/groups
    const [entityType, setEntityType] = useState('tasks')
    const [archivedTasksInfo, setArchivedTasksInfo] = useState(null)

    useEffect(() => {
        setArchivedTasksInfo(boardService.getArchivedTasks(board))
    }, [board])

    function onToggleEntityType() {
        setEntityType((prev) => (prev === 'tasks' ? 'groups' : 'tasks'))
    }

    function getBtnLabel() {
        return `Switch to ${entityType === 'tasks' ? 'lists' : 'cards'}`
    }

    function onUnarchiveTask(hierarchy) {
        updateTask(hierarchy, { archivedAt: null })
    }

    function onDeleteTask(task) {}

    if (!archivedTasksInfo) return 'Loading...'

    return (
        <div className="board-menu-main">
            <button
                className="btn-secondary-centered"
                onClick={onToggleEntityType}
            >
                {getBtnLabel()}
            </button>

            <ul>
                {archivedTasksInfo.map(({ group, task }) => (
                    <li key={task._id}>
                        <ArchivedTaskPreview
                            hierarchy={{ board, group, task }}
                            onUnarchive={onUnarchiveTask}
                            onDelete={onDeleteTask}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
