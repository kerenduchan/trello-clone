import { useEffect, useState } from 'react'
import { BoardMenuActivityList } from './BoardMenuActivityList'

export function BoardMenuActivity({ board }) {
    const [selected, setSelected] = useState('all')
    const [filteredActivities, setFilteredActivities] = useState(null)

    useEffect(() => {
        let newFilteredActivities = board.activities
        if (selected === 'comments') {
            newFilteredActivities = newFilteredActivities.filter(
                (a) => a.type === 'task-comment'
            )
        }

        // populate the user field per activity
        newFilteredActivities = newFilteredActivities.map((a) => ({
            ...a,
            user: board.members.find((m) => m._id === a.userId),
        }))

        setFilteredActivities(newFilteredActivities)
    }, [board.activities, selected])

    function onAllClick() {
        setSelected('all')
    }

    function onCommentsClick() {
        setSelected('comments')
    }

    return (
        <div className="board-menu-activity">
            {/* Top bar */}
            <div className="topbar">
                {/* All button */}
                <button
                    className={selected === 'all' ? 'selected' : ''}
                    onClick={onAllClick}
                >
                    All
                </button>

                {/* Comments button */}
                <button
                    className={selected === 'comments' ? 'selected' : ''}
                    onClick={onCommentsClick}
                >
                    Comments
                </button>
            </div>

            <BoardMenuActivityList activities={filteredActivities} />
        </div>
    )
}
