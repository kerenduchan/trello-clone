import { useSelector, useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import {
    curChecklistChanged,
    selectChecklistId,
} from '../../../store/reducers/app.reducer'
import { boardService } from '../../../services/board.service'
import { deleteChecklist } from '../../../store/actions/task/task.checklist.actions'
import { useForm } from '../../../customHooks/useForm'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { ChecklistItem } from './ChecklistItem'
import { ProgressBar } from '../../general/ProgressBar'
import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { ChecklistItemCreateForm } from './ChecklistItemCreateForm'

export function Checklist({ hierarchy, checklist, index }) {
    const dispatch = useDispatch()
    const curChecklistId = useSelector(selectChecklistId)

    // When create checklist item form is closed, need to retain draft
    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyChecklistItem()
    )

    const deleteChecklistMenu = usePopoverState()

    function onDeleteChecklist() {
        try {
            deleteChecklist(hierarchy, checklist)
            deleteChecklistMenu.onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onShowForm() {
        dispatch(curChecklistChanged(checklist._id))
    }

    function onHideForm() {
        dispatch(curChecklistChanged(null))
    }

    function isShowForm() {
        return curChecklistId === checklist._id
    }

    return (
        <Draggable draggableId={checklist._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className="checklist"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <TaskDetailsSubsectionHeader
                        icon="checklist"
                        title={checklist.title}
                    >
                        <SecondaryBtn
                            className="btn-title"
                            text="Delete"
                            {...deleteChecklistMenu.triggerAndTarget}
                        />
                    </TaskDetailsSubsectionHeader>

                    <div className="content">
                        <ProgressBar
                            percent={boardService.getChecklistPercent(
                                checklist
                            )}
                        />

                        <ol className="items">
                            {checklist.items.map((item) => (
                                <li key={item._id}>
                                    <ChecklistItem
                                        hierarchy={hierarchy}
                                        checklist={checklist}
                                        item={item}
                                    />
                                </li>
                            ))}
                        </ol>

                        {isShowForm() ? (
                            <ChecklistItemCreateForm
                                hierarchy={hierarchy}
                                checklist={checklist}
                                onClose={onHideForm}
                                draft={draft}
                                handleChange={handleChange}
                                setDraft={setDraft}
                            />
                        ) : (
                            <div className="add-item">
                                <SecondaryBtn
                                    className="btn-add"
                                    text="Add an item"
                                    onClick={onShowForm}
                                />
                            </div>
                        )}
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
                </div>
            )}
        </Draggable>
    )
}
