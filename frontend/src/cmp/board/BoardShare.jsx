import { useEffect, useState } from 'react'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { Icon } from '../general/Icon'
import { PopoverMenu } from '../general/PopoverMenu'
import { MemberBtn } from '../task/members/MemberBtn'

export function BoardShare({ board }) {
    const shareMenu = usePopoverState()
    const [users, setUsers] = useState(board.members)
    const [nonMembers, setNonMembers] = useState(null)

    useEffect(() => {
        setNonMembers(users.filter((u) => !isBoardMember(u)))
    }, [users])

    function onUserClick() {}

    function isBoardMember(user) {
        return board.members.find((m) => m._id === user._id)
    }

    if (!nonMembers) return <></>

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
                    <h4>Users</h4>

                    <ul>
                        {nonMembers.map((user) => (
                            <li key={user._id}>
                                <MemberBtn
                                    member={user}
                                    isChecked={false}
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
