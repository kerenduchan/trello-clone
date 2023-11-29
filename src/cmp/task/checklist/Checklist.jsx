import { useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { ChecklistItem } from './ChecklistItem'
import { ProgressBar } from '../../general/ProgressBar'
import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { boardService } from '../../../services/board.service'
import { deleteChecklist } from '../../../store/actions/board.actions'
import { ChecklistItemCreateForm } from './ChecklistItemCreateForm'

export function Checklist({ board, group, task, checklist }) {
    const [showForm, setShowForm] = useState()

    // When create checklist item form is closed, need to retain draft
    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyChecklistItem()
    )

    const deleteChecklistMenu = usePopoverState()

    function onDeleteChecklist() {
        try {
            deleteChecklist(board, group, task, checklist)
            deleteChecklistMenu.onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <>
            <div className="checklist">
                <TaskDetailsSubsectionHeader
                    icon="checklist"
                    title={checklist.title}
                >
                    <SecondaryBtn
                        className="title-btn"
                        text="Delete"
                        {...deleteChecklistMenu.triggerAndTarget}
                    />
                </TaskDetailsSubsectionHeader>

                <div className="content">
                    <ProgressBar
                        percent={boardService.getChecklistPercent(checklist)}
                    />

                    <ol className="items">
                        {checklist.items.map((item) => (
                            <li key={item._id}>
                                <ChecklistItem
                                    board={board}
                                    group={group}
                                    task={task}
                                    checklist={checklist}
                                    item={item}
                                />
                            </li>
                        ))}
                    </ol>

                    {showForm ? (
                        <ChecklistItemCreateForm
                            board={board}
                            group={group}
                            task={task}
                            checklist={checklist}
                            onClose={() => setShowForm(false)}
                            draft={draft}
                            handleChange={handleChange}
                            setDraft={setDraft}
                        />
                    ) : (
                        <div className="add-item">
                            <SecondaryBtn
                                className="add-btn"
                                text="Add an item"
                                onClick={() => setShowForm(true)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Delete checklist menu */}
            {deleteChecklistMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteChecklistMenu}
                    title={`Delete ${checklist.title}?`}
                    text="Deleting a checklist is permanent and there is no way to get it back."
                    btnText="Delete checklist"
                    onDelete={onDeleteChecklist}
                />
            )}
        </>
    )
}
