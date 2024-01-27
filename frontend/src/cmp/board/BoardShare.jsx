import { useEffect, useState } from 'react'
import { userService } from '../../services/user/user.service'
import { updateBoard } from '../../store/actions/board/board.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { Icon } from '../general/Icon'
import { PopoverMenu } from '../general/PopoverMenu'
import { MemberBtn } from '../task/members/MemberBtn'

export function BoardShare({ board }) {
    const shareMenu = usePopoverState()
    const [users, setUsers] = useState(null)
    const [nonMembers, setNonMembers] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        if (!users) return
        setNonMembers(users.filter((u) => !isBoardMember(u)))
    }, [users, board])

    async function onUserClick(user) {
        const members = [...board.members, user]
        const memberIds = members.map((m) => m._id)
        await updateBoard(board, { memberIds, members })
        shareMenu.onClose()
    }

    function isBoardMember(user) {
        return board.members.find((m) => m._id === user._id)
    }

    async function loadUsers() {
        const allUsers = await userService.query()
        setUsers(allUsers.data)
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
                    {!!nonMembers.length ? (
                        <>
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
                        </>
                    ) : (
                        <div>No more users to add.</div>
                    )}
                </PopoverMenu>
            )}
        </div>
    )
}
