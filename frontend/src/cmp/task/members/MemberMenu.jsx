import { Popover } from '../../general/Popover'

export function MemberMenu({ popover, member }) {
    const { refEl, onClose } = popover

    return (
        <Popover
            className="popover-menu member-menu"
            refEl={refEl}
            onClose={onClose}
        >
            <div className="header"></div>
        </Popover>
    )
}
