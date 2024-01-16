import { PopoverMenu } from './PopoverMenu'

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
                <button className="btn-danger btn-delete" onClick={onDelete}>
                    {btnText}
                </button>
            </div>
        </PopoverMenu>
    )
}
