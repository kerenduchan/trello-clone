import { PopoverMenu } from '../../general/PopoverMenu'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    return (
        <PopoverMenu
            className="task-attachment-menu"
            title="Attach"
            {...popoverState.popover}
        >
            <h5>Attach a file from your computer</h5>

            <button className="btn-secondary-centered btn-choose-file">
                Choose a file
            </button>

            <hr />
            <h5>Display text (optional)</h5>
            <input type="text" placeholder="Text to display" />
        </PopoverMenu>
    )
}
