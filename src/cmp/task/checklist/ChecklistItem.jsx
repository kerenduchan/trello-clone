import { updateChecklistItem } from '../../../store/actions/board.actions'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { CircleBtn } from '../../general/btn/CircleBtn'
import { ChecklistItemActionsMenu } from './ChecklistItemActionsMenu'

export function ChecklistItem({ board, group, task, checklist, item }) {
    const actionsMenu = usePopoverState()

    function onCheckboxClick() {
        try {
            updateChecklistItem(board, group, task, checklist, item, {
                isDone: !item.isDone,
            })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <>
            <div className="checklist-item">
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={item.isDone}
                    onChange={onCheckboxClick}
                />
                <div className="title-container">
                    <span className={`title ${item.isDone ? 'done' : ''}`}>
                        {item.title}
                    </span>
                    <div className="actions">
                        <CircleBtn
                            type="more"
                            {...actionsMenu.triggerAndTarget}
                        />
                    </div>
                </div>
            </div>
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
