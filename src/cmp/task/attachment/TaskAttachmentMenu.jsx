import { PopoverMenu } from '../../general/PopoverMenu'
import { uploadService } from '../../../services/upload.service'
import { addTaskAttachment } from '../../../store/actions/task/task.actions'
import { BtnFileUpload } from '../../general/btn/BtnFileUpload'

export function TaskAttachmentMenu({ hierarchy, popoverState }) {
    async function onFileSelected(file) {
        const fileUrl = await uploadService.uploadFile(file)
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
            <BtnFileUpload onFileSelected={onFileSelected} />
        </PopoverMenu>
    )
}
