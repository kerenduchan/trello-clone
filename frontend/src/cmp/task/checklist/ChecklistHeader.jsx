import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { Icon } from '../../general/Icon'

export function ChecklistHeader({ title, onDelete }) {
    const deleteChecklistMenu = usePopoverState()

    function onDeleteInternal() {
        deleteChecklistMenu.onClose()
        onDelete()
    }

    return (
        <div className="checklist-header task-details-subsection-header">
            <Icon type="checklist" size="md" />
            <div className="title">{title}</div>
            <button
                className="btn-title btn-delete btn-secondary"
                {...deleteChecklistMenu.triggerAndTarget}
            >
                Delete
            </button>

            {/* Delete checklist menu */}
            {deleteChecklistMenu.show && (
                <DeleteMenu
                    deleteMenu={deleteChecklistMenu}
                    title={`Delete ${title}?`}
                    text="Deleting a checklist is permanent and there is no way to get it back."
                    btnText="Delete checklist"
                    onDelete={onDeleteInternal}
                />
            )}
        </div>
    )
}
