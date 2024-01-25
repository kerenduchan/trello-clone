import { PopoverMenu } from '../../general/PopoverMenu'
import { uploadService } from '../../../services/upload.service'
import { addTaskAttachment } from '../../../store/actions/task/task.attachment.actions'
import { BtnFileUpload } from '../../general/btn/BtnFileUpload'
import { useState } from 'react'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    const [isUploading, setIsUploading] = useState(false)

    async function onFileSelected(file) {
        setIsUploading(true)
        const fileUrl = await uploadService.uploadFile(file)
        addTaskAttachment(hierarchy, fileUrl)
        setIsUploading(false)
        popoverState.onClose()
    }

    return (
        <PopoverMenu
            className={`task-attachment-menu ${isUploading ? 'uploading' : ''}`}
            title="Attach"
            {...popoverState.popover}
        >
            <h5>Attach a file from your computer</h5>
            <BtnFileUpload onFileSelected={onFileSelected} />

            <div className="overlay">
                <span>Uploading, please wait...</span>
            </div>
        </PopoverMenu>
    )
}
