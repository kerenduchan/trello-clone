import { PopoverMenu } from './PopoverMenu'
import { PrimaryBtn } from './btn/PrimaryBtn'

export function DeleteMenu({
    deleteMenu,
    title,
    text,
    btnText = 'Delete',
    onDelete,
}) {
    return (
        <PopoverMenu title={title} {...deleteMenu.popover}>
            <div className="delete-menu">
                <p>{text}</p>
                <PrimaryBtn
                    className="delete-btn danger"
                    text={btnText}
                    onClick={onDelete}
                />
            </div>
        </PopoverMenu>
    )
}
