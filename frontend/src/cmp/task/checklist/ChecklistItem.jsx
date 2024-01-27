import { useSelector, useDispatch } from 'react-redux'
import {
    curChecklistItemChanged,
    selectChecklistItemId,
} from '../../../store/reducers/app.reducer'
import { updateChecklistItem } from '../../../store/actions/task/task.checklist.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { ChecklistItemActionsMenu } from './ChecklistItemActionsMenu'
import { ChecklistItemEditForm } from './ChecklistItemEditForm'
import { Icon } from '../../general/Icon'
import { Draggable } from 'react-beautiful-dnd'

export function ChecklistItem({ hierarchy, checklist, item, index }) {
    const dispatch = useDispatch()
    const curChecklistItemId = useSelector(selectChecklistItemId)
    const actionsMenu = usePopoverState()

    function onCheckboxClick() {
        onUpdate({ isDone: !item.isDone })
    }

    function onUpdate(fieldsToUpdate) {
        try {
            updateChecklistItem(hierarchy, checklist, item, fieldsToUpdate)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onShowForm() {
        dispatch(curChecklistItemChanged(item._id))
    }

    function onHideForm() {
        dispatch(curChecklistItemChanged(null))
    }

    function isShowForm() {
        return curChecklistItemId === item._id
    }

    return (
        <Draggable draggableId={item._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className="checklist-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* Checkbox */}
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={item.isDone}
                        onChange={onCheckboxClick}
                    />

                    {isShowForm() ? (
                        <ChecklistItemEditForm
                            hierarchy={hierarchy}
                            checklist={checklist}
                            item={item}
                            onClose={onHideForm}
                        />
                    ) : (
                        <div className="title-container" onClick={onShowForm}>
                            {/* Title */}
                            <span
                                className={`title ${item.isDone ? 'done' : ''}`}
                            >
                                {item.title}
                            </span>

                            {/* Actions button(s) */}
                            <div className="actions">
                                <button
                                    className="btn-circle"
                                    {...actionsMenu.triggerAndTarget}
                                >
                                    <Icon type="more" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Actions menu */}
                    <ChecklistItemActionsMenu
                        hierarchy={hierarchy}
                        checklist={checklist}
                        item={item}
                        popoverState={actionsMenu}
                    />
                </div>
            )}
        </Draggable>
    )
}
