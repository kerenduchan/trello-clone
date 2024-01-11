import { useRef } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { uploadService } from '../../../services/upload.service'
import { addTaskAttachment } from '../../../store/actions/board.actions'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    const inputFileRef = useRef(null)

    function onClick() {
        inputFileRef.current.click()
    }

    async function onFileSelected(e) {
        const files = e.target.files
        if (files.length === 0) return

        const fileUrl = await uploadService.uploadFile(e.target.files[0])
        addTaskAttachment(hierarchy, fileUrl)
        popoverState.onClose()
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
