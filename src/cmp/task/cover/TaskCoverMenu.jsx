import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { TaskCoverMenuColors } from './TaskCoverMenuColors'

export function TaskCoverMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy

    function onRemoveCover() {
        updateTask(hierarchy, { cover: null })
    }

    function onColorClick(c) {
        const cover = task.cover?.bgColor?._id === c._id ? null : { bgColor: c }
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

            {/* Remove cover */}
            <SecondaryBtn text="Remove cover" onClick={onRemoveCover} />

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
