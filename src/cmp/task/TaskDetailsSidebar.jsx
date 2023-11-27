import { useNavigate } from 'react-router'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { DeleteMenu } from '../general/DeleteMenu'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskLabelsMenu } from './TaskLabelsMenu'

export function TaskDetailsSidebar({ board, group, task }) {
    const navigate = useNavigate()
    const labelsMenu = usePopoverState()
    const deleteTaskMenu = usePopoverState()

    function onDeleteTask() {
        // remove this task from the group in the board
        const boardClone = structuredClone(board)
        const groupClone = boardService.getGroupById(boardClone, group._id)
        groupClone.tasks = groupClone.tasks.filter((t) => t._id !== task._id)
        updateBoard(boardClone)
        deleteTaskMenu.onClose()
        navigate(`/b/${board._id}`)
    }

    return (
        <>
            <div className="task-details-sidebar">
                <section>
                    <h3>Suggested</h3>
                    <div className="content">
                        <SecondaryBtn icon="member" text="Join" />
                    </div>
                </section>

                <section>
                    <h3>Add to card</h3>
                    <div className="content">
                        <SecondaryBtn icon="member" text="Members" />
                        <SecondaryBtn
                            {...labelsMenu.triggerAndTarget}
                            icon="label"
                            text="Labels"
                        />
                        <SecondaryBtn icon="checklist" text="Checklist" />
                        <SecondaryBtn icon="date" text="Dates" />
                        <SecondaryBtn icon="attachment" text="Attachment" />
                        <SecondaryBtn icon="cover" text="Cover" />
                        <SecondaryBtn icon="customField" text="Custom Fields" />
                    </div>
                </section>

                <section>
                    <h3>Actions</h3>
                    <div className="content">
                        <SecondaryBtn icon="move" text="Move" />
                        <SecondaryBtn icon="copy" text="Copy" />
                        <SecondaryBtn icon="template" text="Make Template" />
                        <SecondaryBtn
                            {...deleteTaskMenu.triggerAndTarget}
                            icon="archive"
                            text="Archive"
                        />
                        <SecondaryBtn icon="share" text="Share" />
                    </div>
                </section>
            </div>

            {/* Labels menu */}
            {labelsMenu.show && (
                <TaskLabelsMenu
                    board={board}
                    group={group}
                    task={task}
                    labelsMenu={labelsMenu}
                />
            )}

            {/* Delete task menu */}
            {deleteTaskMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteTaskMenu}
                    title="Delete Card?"
                    text="All actions will be removed from the activity feed and you won't be able to re-open the card. There is no undo."
                    onDelete={onDeleteTask}
                />
            )}
        </>
    )
}
