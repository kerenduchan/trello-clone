import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskDetailsChecklistItem } from './TaskDetailsChecklistItem'
import { ProgressBar } from '../general/ProgressBar'
import { TaskDetailsSubsectionHeader } from './TaskDetailsSubsectionHeader'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { DeleteMenu } from '../general/DeleteMenu'
import { boardService } from '../../services/board.service'
import { deleteChecklist } from '../../store/actions/board.actions'

export function TaskDetailsChecklist({ board, group, task, checklist }) {
    const deleteChecklistMenu = usePopoverState()

    function getPercent() {
        return Math.round(
            (100 * boardService.countDoneItemsInChecklist(checklist)) /
                checklist.items.length
        )
    }

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
            <div className="task-details-checklist">
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
                    <ProgressBar percent={getPercent()} />

                    <ol className="items">
                        {checklist.items.map((item) => (
                            <li key={item._id}>
                                <TaskDetailsChecklistItem
                                    board={board}
                                    group={group}
                                    task={task}
                                    checklist={checklist}
                                    item={item}
                                />
                            </li>
                        ))}
                    </ol>
                    <SecondaryBtn className="add-btn" text="Add an item" />
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
