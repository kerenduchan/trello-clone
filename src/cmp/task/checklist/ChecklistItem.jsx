import { useState } from 'react'
import { updateChecklistItem } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { CircleBtn } from '../../general/btn/CircleBtn'
import { ChecklistItemActionsMenu } from './ChecklistItemActionsMenu'
import { ChecklistItemEditForm } from './ChecklistItemEditForm'

export function ChecklistItem({ board, group, task, checklist, item }) {
    const actionsMenu = usePopoverState()
    const [showForm, setShowForm] = useState(false)

    function onCheckboxClick() {
        onUpdate({ isDone: !item.isDone })
    }

    function onUpdate(fieldsToUpdate) {
        try {
            updateChecklistItem(
                board,
                group,
                task,
                checklist,
                item,
                fieldsToUpdate
            )
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
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

                {showForm ? (
                    <ChecklistItemEditForm
                        title={item.title}
                        onClose={() => setShowForm(false)}
                    />
                ) : (
                    <div
                        className="title-container"
                        onClick={() => setShowForm(true)}
                    >
                        {/* Title */}
                        <span className={`title ${item.isDone ? 'done' : ''}`}>
                            {item.title}
                        </span>

                        {/* Actions button(s) */}
                        <div className="actions">
                            <CircleBtn
                                type="more"
                                {...actionsMenu.triggerAndTarget}
                            />
                        </div>
                    </div>
                )}
            </div>
            {/* Actions menu */}
            <ChecklistItemActionsMenu
                board={board}
                group={group}
                task={task}
                checklist={checklist}
                item={item}
                popoverState={actionsMenu}
            />
        </>
    )
}
