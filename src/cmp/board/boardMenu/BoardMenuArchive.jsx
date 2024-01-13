import { useEffect, useState } from 'react'
import { boardService } from '../../../services/board.service'
import { deleteTask, updateTask } from '../../../store/actions/task.actions'
import { updateGroup } from '../../../store/actions/group.actions'

import { ArchivedTaskPreview } from './ArchivedTaskPreview'
import { ArchivedGroupPreview } from './ArchivedGroupPreview'

export function BoardMenuArchive({ board }) {
    // tasks/groups
    const [entityType, setEntityType] = useState('tasks')
    const [archivedTasksInfo, setArchivedTasksInfo] = useState(null)
    const [archivedGroups, setArchivedGroups] = useState(null)

    useEffect(() => {
        setArchivedTasksInfo(boardService.getArchivedTasks(board))
        setArchivedGroups(boardService.getArchivedGroups(board))
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

    function onDeleteTask(hierarchy) {
        const { board, group, task } = hierarchy
        deleteTask(board._id, group._id, task._id)
    }

    function onUnarchiveGroup(group) {
        updateGroup(board._id, group, { archivedAt: null })
    }

    if (!archivedTasksInfo || !archivedGroups) return 'Loading...'

    return (
        <div className="board-menu-archive">
            <div className="controls">
                <button
                    className="btn-secondary-centered"
                    onClick={onToggleEntityType}
                >
                    {getBtnLabel()}
                </button>
            </div>

            <ul>
                {entityType === 'tasks'
                    ? archivedTasksInfo.map(({ group, task }) => (
                          <li className="archived-task-li" key={task._id}>
                              <ArchivedTaskPreview
                                  hierarchy={{ board, group, task }}
                                  onUnarchive={onUnarchiveTask}
                                  onDelete={onDeleteTask}
                              />
                          </li>
                      ))
                    : archivedGroups.map((group) => (
                          <li className="archived-group-li" key={group._id}>
                              <ArchivedGroupPreview
                                  group={group}
                                  onUnarchive={onUnarchiveGroup}
                              />
                          </li>
                      ))}
            </ul>
        </div>
    )
}
