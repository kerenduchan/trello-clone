import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectBoard } from '../../../store/reducers/board.reducer'
import { selectLoggedinUser } from '../../../store/reducers/app.reducer'
import { Icon } from '../../general/Icon'
import { userService } from '../../../services/user/user.service'

export function BoardFilterMembers({ filter, onChange }) {
    const board = useSelector(selectBoard)
    const loggedinUser = useSelector(selectLoggedinUser)
    const [selectedMemberIds, setSelectedMembers] = useState(filter.members)

    useEffect(() => {
        onChange({ members: selectedMemberIds })
    }, [selectedMemberIds])

    function onClick(memberId) {
        setSelectedMembers((prev) =>
            prev.find((id) => id === memberId)
                ? prev.filter((id) => id !== memberId)
                : [...prev, memberId]
        )
    }

    const items = [
        board.members.find((m) => m._id === loggedinUser._id),
        ...board.members.filter((m) => m._id !== loggedinUser._id),
    ]

    function isSelected(memberId) {
        return selectedMemberIds.find((id) => id === memberId) !== undefined
    }

    return (
        <div className="board-filter-members">
            {/* No members */}
            <li key={'none'} className="member" onClick={() => onClick('none')}>
                <input
                    type="checkbox"
                    name={'none'}
                    value={'none'}
                    onChange={() => {}}
                    checked={isSelected('none')}
                />
                <span className="field-content">
                    <Icon type="member" />
                    <span className="label no-members-label">No members</span>
                </span>
            </li>

            {/* Board members */}
            {items.map((member) => {
                const { _id, fullname, username } = member
                return (
                    <li
                        key={_id}
                        className="member"
                        onClick={() => onClick(_id)}
                    >
                        <input
                            type="checkbox"
                            name={_id}
                            value={_id}
                            onChange={() => {}}
                            checked={isSelected(_id)}
                        />
                        <span className="field-content">
                            <img src={userService.getImgUrl(member)} />
                            <span className="label fullname">
                                {_id === loggedinUser._id
                                    ? 'Cards assigned to me'
                                    : fullname}
                            </span>
                            {_id !== loggedinUser._id && (
                                <span className="username">@{username}</span>
                            )}
                        </span>
                    </li>
                )
            })}
        </div>
    )
}
