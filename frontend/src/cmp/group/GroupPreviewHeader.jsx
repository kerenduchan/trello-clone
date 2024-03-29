import { updateGroup } from '../../store/actions/group.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'
import { GroupMenu } from './groupMenu/GroupMenu'

export function GroupPreviewHeader({
    board,
    group,
    onTaskCreate,
    isFilterEmpty,
}) {
    const groupMenu = usePopoverState()

    function onTitleChange(title) {
        try {
            updateGroup(board, group, { title })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function getFilteredCountText() {
        const count = group.tasks.length
        if (count === 1) {
            return '1 card matches filters'
        }
        return `${count} cards match filters`
    }

    return (
        <header className="group-preview-header">
            <EditableTitle title={group.title} onChange={onTitleChange} />
            {!isFilterEmpty && (
                <div className="filtered-count">{getFilteredCountText()}</div>
            )}
            <button
                className="btn-square btn-more"
                {...groupMenu.triggerAndTarget}
            >
                <Icon type="more" />
            </button>

            {/* Group menu */}
            {groupMenu.show && (
                <GroupMenu
                    board={board}
                    group={group}
                    popoverState={groupMenu}
                    onTaskCreate={onTaskCreate}
                    onClose={groupMenu.onClose}
                />
            )}
        </header>
    )
}
