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
        const { bgColor, bgImage } = task.cover

        if (bgColor) {
            return { backgroundColor: bgColor.color }
        }
        if (bgImage) {
            return {
                backgroundColor: bgImage.color,
                backgroundImage: `url(${bgImage.url})`,
            }
        }
    }

    function getButtonStyle() {
        return { color: task.cover.bgColor?.textColor }
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
