import { useEffect, useRef, useState } from 'react'
import { utilService } from '../../../services/util.service'

export function GroupMenuCopyGroup({ board, group, onCopyGroup }) {
    const [groupCopyTitle, setGroupCopyTitle] = useState(group.title)
    const textareaRef = useRef(null)

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onCopy() {
        const position = utilService.getIdxById(board.groups, group._id)
        console.log(position)
        onCopyGroup(groupCopyTitle, position + 1)
    }

    return (
        <div className="group-menu-copy-group">
            <h4 className="h4-title">Name</h4>
            <textarea
                ref={textareaRef}
                className="group-copy-title"
                autoFocus
                name="title"
                id="title"
                onChange={(e) => setGroupCopyTitle(e.target.value)}
                value={groupCopyTitle}
            />

            <button className="btn-primary btn-copy" onClick={onCopy}>
                Create list
            </button>
        </div>
    )
}
