import { useState } from 'react'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { Icon } from '../general/Icon'
import { PopoverMenu } from '../general/PopoverMenu'
import { MemberBtn } from '../task/members/MemberBtn'

export function BoardShare({ board }) {
    const shareMenu = usePopoverState()

    const [users, setUsers] = useState([])

    function onUserClick() {}

    function isBoardMember(user) {
        return board.members?.includes(user._id)
    }

    return (
        <div className="board-share">
            {/* Share button */}
            <button className="btn-share" {...shareMenu.triggerAndTarget}>
                <Icon type="add_member" size="xs"></Icon>
                <span className="label">Share</span>
            </button>

            {/* Share menu */}
            {shareMenu.show && (
                <PopoverMenu
                    className="share-menu"
                    title="Share Board"
                    {...shareMenu.popover}
                >
                    <h4>Board members</h4>

                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <MemberBtn
                                    member={user}
                                    isChecked={isBoardMember(user)}
                                    onClick={() => onUserClick(user)}
                                />
                            </li>
                        ))}
                    </ul>
                </PopoverMenu>
            )}
        </div>
    )
}
