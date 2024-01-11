import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { TaskCoverMenuColors } from './TaskCoverMenuColors'
import { TaskCoverMenuSize } from './TaskCoverMenuSize'

export function TaskCoverMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy

    function onRemoveCover() {
        const cover = { size: task.cover.size, bgColor: null }
        updateTask(hierarchy, { cover })
    }

    function onColorClick(c) {
        if (task.cover?.bgColor?._id === c._id) {
            onRemoveCover()
        }
        const cover = { size: task.cover.size, bgColor: c }
        updateTask(hierarchy, { cover })
    }

    function onSizeClick(size) {
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
                <SecondaryBtn
                    className="btn-remove-cover"
                    text="Remove cover"
                    onClick={onRemoveCover}
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

            <SecondaryBtn text="Upload a cover image" />
        </PopoverMenu>
    )
}
