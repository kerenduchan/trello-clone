import { Popover } from '../general/Popover'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'

export function BoardCreate({ onClose }) {
    return (
        <Popover onClose={onClose} title="Create Board">
            <form className="board-create-form">
                <label htmlFor="title">Board Title</label>
                <input id="title" name="title" type="text" />
                <PrimaryBtn className="create-btn" text="Create" />
            </form>
        </Popover>
    )
}
