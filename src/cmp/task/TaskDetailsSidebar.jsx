import { useNavigate } from 'react-router'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { deleteTask } from '../../store/actions/board.actions'
import { DeleteMenu } from '../general/DeleteMenu'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { LabelsMenu } from '../labelsMenu/LabelsMenu'
import { ChecklistMenu } from './checklist/ChecklistMenu'
import { MembersMenu } from './members/MembersMenu'
import { TaskCoverMenu } from './cover/TaskCoverMenu'
import { TaskDatesMenu } from './dates/TaskDatesMenu'
import { TaskMoveMenu } from './move/TaskMoveMenu'

export function TaskDetailsSidebar({ hierarchy }) {
    const { board } = hierarchy

    const navigate = useNavigate()
    const membersMenu = usePopoverState()
    const labelsMenu = usePopoverState()
    const checklistMenu = usePopoverState()
    const datesMenu = usePopoverState()
    const coverMenu = usePopoverState()
    const moveMenu = usePopoverState()
    const deleteTaskMenu = usePopoverState()

    function onDeleteTask() {
        try {
            deleteTask(hierarchy)
            deleteTaskMenu.onClose()
            navigate(`/b/${board._id}`)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <>
            <div className="task-details-sidebar">
                <section>
                    <h3>Add to card</h3>
                    <div className="content">
                        {/* Members */}
                        <SecondaryBtn
                            {...membersMenu.triggerAndTarget}
                            icon="member"
                            text="Members"
                        />

                        {/* Labels */}
                        <SecondaryBtn
                            {...labelsMenu.triggerAndTarget}
                            icon="label"
                            text="Labels"
                        />

                        {/* Checklist */}
                        <SecondaryBtn
                            {...checklistMenu.triggerAndTarget}
                            icon="checklist"
                            text="Checklist"
                        />

                        {/* Dates */}
                        <SecondaryBtn
                            {...datesMenu.triggerAndTarget}
                            icon="date"
                            text="Dates"
                        />

                        {/* Attachment */}
                        <SecondaryBtn icon="attachment" text="Attachment" />

                        {/* Cover */}
                        <SecondaryBtn
                            {...coverMenu.triggerAndTarget}
                            icon="cover"
                            text="Cover"
                        />

                        <SecondaryBtn icon="customField" text="Custom Fields" />
                    </div>
                </section>

                <section>
                    <h3>Actions</h3>
                    <div className="content">
                        <SecondaryBtn
                            {...moveMenu.triggerAndTarget}
                            icon="move"
                            text="Move"
                        />
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

            {/* Members menu */}
            {membersMenu.show && (
                <MembersMenu hierarchy={hierarchy} popoverState={membersMenu} />
            )}

            {/* Labels menu */}
            {labelsMenu.show && (
                <LabelsMenu hierarchy={hierarchy} labelsMenu={labelsMenu} />
            )}

            {/* Checklist menu */}
            {checklistMenu.show && (
                <ChecklistMenu
                    hierarchy={hierarchy}
                    checklistMenu={checklistMenu}
                />
            )}

            {/* Dates menu */}
            {datesMenu.show && (
                <TaskDatesMenu hierarchy={hierarchy} popoverState={datesMenu} />
            )}

            {/* Cover menu */}
            {coverMenu.show && (
                <TaskCoverMenu hierarchy={hierarchy} popoverState={coverMenu} />
            )}

            {/* Move menu */}
            {moveMenu.show && (
                <TaskMoveMenu hierarchy={hierarchy} popoverState={moveMenu} />
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
