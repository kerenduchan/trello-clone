import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function BoardFilterMembers({ filter, onChange }) {
    const board = useSelector((storeState) => storeState.boardModule.curBoard)

    const [selectedMemberIds, setSelectedMembers] = useState(filter.member)

    useEffect(() => {
        onChange({ member: selectedMemberIds })
    }, [selectedMemberIds])

    function onClick(memberId) {
        setSelectedMembers((prev) =>
            prev.find((id) => id === memberId)
                ? prev.filter((id) => id !== memberId)
                : [...prev, memberId]
        )
    }

    function isSelected(memberId) {
        return selectedMemberIds.find((id) => id === memberId) !== undefined
    }

    return (
        <div className="board-filter-members">
            {board.members.map(({ _id, fullname }) => (
                <li key={_id} className="member" onClick={() => onClick(_id)}>
                    <input
                        type="checkbox"
                        name={_id}
                        value={_id}
                        onChange={() => {}}
                        checked={isSelected(_id)}
                    />
                    <span className="field-content">
                        <span className="label">{fullname}</span>
                    </span>
                </li>
            ))}
        </div>
    )
}
