import {
    removeTaskCover,
    setTaskCoverColor,
    updateTask,
} from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { TaskCoverMenuColors } from './TaskCoverMenuColors'
import { TaskCoverMenuSize } from './TaskCoverMenuSize'

export function TaskCoverMenu({ hierarchy, popoverState, onRemoveCover }) {
    const { task } = hierarchy

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

    return (
        <PopoverMenu
            className="task-cover-menu"
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
            {task.cover?.bgColor && (
                <button
                    className="btn-secondary-centered btn-remove-cover"
                    onClick={onRemoveCoverInternal}
                >
                    Remove cover
                </button>
            )}

            {/* Colors */}
            <h4>Colors</h4>
            <TaskCoverMenuColors
                hierarchy={hierarchy}
                onColorClick={onColorClick}
            />

            {/* Attachments */}
            <h4>Attachments</h4>

            <button className="btn-secondary-centered btn-upload-image">
                Upload a cover image
            </button>
        </PopoverMenu>
    )
}
