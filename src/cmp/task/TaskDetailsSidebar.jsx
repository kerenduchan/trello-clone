import { useNavigate } from 'react-router'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { deleteTask } from '../../store/actions/board.actions'
import { DeleteMenu } from '../general/DeleteMenu'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { LabelsMenu } from './label/LabelsMenu'
import { ChecklistMenu } from './checklist/ChecklistMenu'

export function TaskDetailsSidebar({ hierarchy }) {
    const { board } = hierarchy

    const navigate = useNavigate()
    const labelsMenu = usePopoverState()
    const checklistMenu = usePopoverState()
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
                        <SecondaryBtn
                            {...checklistMenu.triggerAndTarget}
                            icon="checklist"
                            text="Checklist"
                        />
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
                <LabelsMenu hierarchy={hierarchy} labelsMenu={labelsMenu} />
            )}

            {/* Checklist menu */}
            {checklistMenu.show && (
                <ChecklistMenu
                    hierarchy={hierarchy}
                    checklistMenu={checklistMenu}
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
