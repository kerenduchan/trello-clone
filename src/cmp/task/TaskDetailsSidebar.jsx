import { useNavigate } from 'react-router'
import { updateTask, deleteTask } from '../../store/actions/task.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { DeleteMenu } from '../general/DeleteMenu'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { LabelsMenu } from '../labelsMenu/LabelsMenu'
import { ChecklistMenu } from './checklist/ChecklistMenu'
import { MembersMenu } from './members/MembersMenu'
import { TaskCoverMenu } from './cover/TaskCoverMenu'
import { TaskDatesMenu } from './dates/TaskDatesMenu'
import { TaskMoveMenu } from './move/TaskMoveMenu'
import { TaskAttachmentMenu } from './attachment/TaskAttachmentMenu'

export function TaskDetailsSidebar({ hierarchy }) {
    const { board, group, task } = hierarchy

    const navigate = useNavigate()
    const membersMenu = usePopoverState()
    const labelsMenu = usePopoverState()
    const checklistMenu = usePopoverState()
    const datesMenu = usePopoverState()
    const attachmentMenu = usePopoverState()
    const coverMenu = usePopoverState()
    const moveMenu = usePopoverState()
    const copyMenu = usePopoverState()
    const deleteTaskMenu = usePopoverState()

    function onDeleteTask() {
        try {
            deleteTask(board._id, group._id, task._id)
            deleteTaskMenu.onClose()
            navigate(`/b/${board._id}`)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onArchive() {
        updateTask(hierarchy, { archivedAt: Date.now() })
    }

    function onSendToBoard() {
        updateTask(hierarchy, { archivedAt: null })
    }

    function hasCover() {
        return task.cover?.bgColor || task.cover?.bgImage
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
                        <SecondaryBtn
                            {...attachmentMenu.triggerAndTarget}
                            icon="attachment"
                            text="Attachment"
                        />

                        {/* Cover */}
                        {!hasCover() && (
                            <SecondaryBtn
                                {...coverMenu.triggerAndTarget}
                                icon="cover"
                                text="Cover"
                            />
                        )}
                    </div>
                </section>

                <section>
                    <h3>Actions</h3>
                    <div className="content">
                        {/* Move */}
                        <SecondaryBtn
                            {...moveMenu.triggerAndTarget}
                            icon="move"
                            text="Move"
                        />

                        {/* Copy */}
                        <SecondaryBtn
                            {...copyMenu.triggerAndTarget}
                            icon="copy"
                            text="Copy"
                        />

                        <hr />

                        {!task.archivedAt ? (
                            // Archive
                            <SecondaryBtn
                                onClick={onArchive}
                                icon="archive"
                                text="Archive"
                            />
                        ) : (
                            <>
                                {/* Send to board */}
                                <SecondaryBtn
                                    onClick={onSendToBoard}
                                    icon="unarchive"
                                    text="Send to board"
                                />
                                {/* Delete */}
                                <SecondaryBtn
                                    {...deleteTaskMenu.triggerAndTarget}
                                    className="btn-delete"
                                    icon="remove"
                                    text="Delete"
                                />
                            </>
                        )}
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

            {/* Attachment menu */}
            {attachmentMenu.show && (
                <TaskAttachmentMenu
                    hierarchy={hierarchy}
                    popoverState={attachmentMenu}
                />
            )}

            {/* Cover menu */}
            {coverMenu.show && (
                <TaskCoverMenu hierarchy={hierarchy} popoverState={coverMenu} />
            )}

            {/* Move menu */}
            {moveMenu.show && (
                <TaskMoveMenu hierarchy={hierarchy} popoverState={moveMenu} />
            )}

            {/* Copy menu */}
            {copyMenu.show && (
                <TaskMoveMenu
                    hierarchy={hierarchy}
                    popoverState={copyMenu}
                    isCopy={true}
                />
            )}

            {/* Archive task menu */}
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
