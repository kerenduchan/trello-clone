import { useState } from 'react'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { DeleteMenu } from '../../general/DeleteMenu'
import { Icon } from '../../general/Icon'
import { ChecklistHeaderEdit } from './ChecklistHeaderEdit'

export function ChecklistHeader({ title, onDelete }) {
    const deleteChecklistMenu = usePopoverState()
    const [showEditTitle, setShowEditTitle] = useState(false)

    function onDeleteInternal() {
        deleteChecklistMenu.onClose()
        onDelete()
    }

    function onTitleClick() {
        setShowEditTitle(true)
    }

    return (
        <div className="checklist-header task-details-subsection-header">
            <Icon type="checklist" size="md" />
            {showEditTitle ? (
                <ChecklistHeaderEdit
                    title={title}
                    onClose={() => setShowEditTitle(false)}
                />
            ) : (
                <>
                    <div className="title" onClick={onTitleClick}>
                        {title}
                    </div>
                    <button
                        className="btn-title btn-delete btn-secondary"
                        {...deleteChecklistMenu.triggerAndTarget}
                    >
                        Delete
                    </button>
                </>
            )}
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
