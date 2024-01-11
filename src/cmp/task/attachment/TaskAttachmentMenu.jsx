import { PopoverMenu } from '../../general/PopoverMenu'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    return (
        <PopoverMenu
            className="task-attachment-menu"
            title="Attach"
            {...popoverState.popover}
        ></PopoverMenu>
    )
}
