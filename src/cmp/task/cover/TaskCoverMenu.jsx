import { boardService } from '../../../services/board.service'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskCoverMenu({ popoverState }) {
    return (
        <PopoverMenu
            className="task-cover-menu"
            title="Cover"
            {...popoverState.popover}
        >
            <h4>Size</h4>

            <SecondaryBtn text="Remove cover" />
            <h4>Colors</h4>
            <ul className="colors">
                {boardService.getCoverColors().map((c) => (
                    <li key={c._id}>
                        <div
                            className="color-btn"
                            style={{ backgroundColor: c.color }}
                        />
                    </li>
                ))}
            </ul>
            <h4>Attachments</h4>

            <SecondaryBtn text="Upload a cover image" />
        </PopoverMenu>
    )
}
