import { useSelector, useDispatch } from 'react-redux'
import { updateChecklistItem } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { ChecklistItemActionsMenu } from './ChecklistItemActionsMenu'
import { ChecklistItemEditForm } from './ChecklistItemEditForm'
import { Icon } from '../../general/Icon'
import { curChecklistItemChanged } from '../../../store/reducers/app.reducer'

export function ChecklistItem({ hierarchy, checklist, item }) {
    const dispatch = useDispatch()
    const curChecklistItemId = useSelector(
        (storeState) => storeState.appModule.curChecklistItemId
    )
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
        <>
            <div className="checklist-item">
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
                        <span className={`title ${item.isDone ? 'done' : ''}`}>
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
            </div>
            {/* Actions menu */}
            <ChecklistItemActionsMenu
                hierarchy={hierarchy}
                checklist={checklist}
                item={item}
                popoverState={actionsMenu}
            />
        </>
    )
}
