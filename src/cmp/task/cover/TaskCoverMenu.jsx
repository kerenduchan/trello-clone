import { boardService } from '../../../services/board.service'
import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskCoverMenu({ hierarchy, popoverState }) {
    function onColorClick(c) {
        updateTask(hierarchy, { cover: { bgColor: c.color } })
    }

    function onRemoveCoverClick() {
        updateTask(hierarchy, { cover: null })
    }

    return (
        <PopoverMenu
            className="task-cover-menu"
            title="Cover"
            {...popoverState.popover}
        >
            <h4>Size</h4>

            <SecondaryBtn text="Remove cover" onClick={onRemoveCoverClick} />
            <h4>Colors</h4>
            <ul className="colors">
                {boardService.getCoverColors().map((c) => (
                    <li key={c._id}>
                        <div
                            className="color-btn"
                            style={{ backgroundColor: c.color }}
                            onClick={() => onColorClick(c)}
                        />
                    </li>
                ))}
            </ul>
            <h4>Attachments</h4>

            <SecondaryBtn text="Upload a cover image" />
        </PopoverMenu>
    )
}
