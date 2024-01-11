import { useRef } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    const inputFileRef = useRef(null)

    function onClick() {
        inputFileRef.current.click()
    }

    function onFileSelected(ev) {
        console.log('on change', ev)
    }

    return (
        <PopoverMenu
            className="task-attachment-menu"
            title="Attach"
            {...popoverState.popover}
        >
            <h5>Attach a file from your computer</h5>

            <button
                className="btn-secondary-centered btn-choose-file"
                onClick={onClick}
            >
                Choose a file
            </button>
            <input type="file" ref={inputFileRef} onChange={onFileSelected} />
        </PopoverMenu>
    )
}
