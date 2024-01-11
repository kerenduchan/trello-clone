import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Icon } from '../../general/Icon'
import { TaskCoverMenu } from './TaskCoverMenu'

export function TaskDetailsCover({ hierarchy }) {
    const { task } = hierarchy
    const coverMenu = usePopoverState()

    function onRemoveCover() {
        coverMenu.onClose()
    }

    function hasCover() {
        return task.cover?.bgColor || task.cover?.bgImage
    }

    function getCoverStyle() {
        if (task.cover.bgColor) {
            return { backgroundColor: task.cover.bgColor.color }
        }
    }

    function getButtonStyle() {
        return { color: task.cover.textColor }
    }

    if (!hasCover()) return <></>

    return (
        <div className="task-details-cover" style={getCoverStyle()}>
            <button
                className="btn-cover"
                style={getButtonStyle()}
                {...coverMenu.triggerAndTarget}
            >
                <Icon type="cover" />
                <span>Cover</span>
            </button>

            {coverMenu.show && (
                <TaskCoverMenu
                    hierarchy={hierarchy}
                    popoverState={coverMenu}
                    onRemoveCover={onRemoveCover}
                />
            )}
        </div>
    )
}
