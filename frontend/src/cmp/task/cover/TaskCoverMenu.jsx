import { uploadService } from '../../../services/upload.service'
import {
    addTaskCoverImage,
    removeTaskCover,
    setTaskCoverColor,
} from '../../../store/actions/task/task.cover.actions'
import { updateTask } from '../../../store/actions/task/task.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { BtnFileUpload } from '../../general/btn/BtnFileUpload'
import { TaskCoverMenuColors } from './TaskCoverMenuColors'
import { TaskCoverMenuSize } from './TaskCoverMenuSize'
import { TaskCoverMenuTextColor } from './TaskCoverMenuTextColor'
import { useState } from 'react'

export function TaskCoverMenu({ hierarchy, popoverState, onRemoveCover }) {
    const { task } = hierarchy

    const [isUploading, setIsUploading] = useState(false)

    function onRemoveCoverInternal() {
        removeTaskCover(hierarchy)
        onRemoveCover && onRemoveCover()
    }

    function onColorClick(c) {
        if (task.cover?.bgColor?._id === c._id) {
            onRemoveCoverInternal()
        } else {
            setTaskCoverColor(hierarchy, c)
        }
    }

    function onSizeClick(size) {
        // retain bg color / bg image, and update size
        const cover = { ...task.cover, size }
        updateTask(hierarchy, { cover })
    }

    function onTextColorClick(textColor) {
        const bgImage = { ...task.cover.bgImage, textColor }
        const cover = { ...task.cover, bgImage }
        updateTask(hierarchy, { cover })
    }

    async function onFileSelected(file) {
        setIsUploading(true)
        const fileUrl = await uploadService.uploadFile(file)
        await addTaskCoverImage(hierarchy, fileUrl)
        setIsUploading(false)
    }

    return (
        <PopoverMenu
            className={`task-cover-menu ${isUploading ? 'uploading' : ''}`}
            title="Cover"
            {...popoverState.popover}
        >
            {/* Size */}
            <h4>Size</h4>
            <TaskCoverMenuSize
                hierarchy={hierarchy}
                onSizeClick={onSizeClick}
            />

            {/* Remove cover */}
            {(task.cover?.bgColor || task.cover?.bgImage) && (
                <button
                    className="btn-secondary-centered btn-remove-cover"
                    onClick={onRemoveCoverInternal}
                >
                    Remove cover
                </button>
            )}

            {/* Text color */}
            {task.cover?.bgImage && task.cover?.size === 'large' && (
                <TaskCoverMenuTextColor
                    hierarchy={hierarchy}
                    onTextColorClick={onTextColorClick}
                />
            )}

            {/* Colors */}
            <h4>Colors</h4>
            <TaskCoverMenuColors
                hierarchy={hierarchy}
                onColorClick={onColorClick}
            />

            {/* Attachments */}
            <h4>Attachments</h4>

            <BtnFileUpload
                onFileSelected={onFileSelected}
                label="Upload a cover image"
            />

            <div className="overlay">
                <span>Uploading, please wait...</span>
            </div>
        </PopoverMenu>
    )
}
