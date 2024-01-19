import { selectTaskComments } from '../../../store/reducers/board.reducer'
import { Icon } from '../../general/Icon'
import { useSelector } from 'react-redux'

export function TaskCommentsBadge({ hierarchy }) {
    const { task } = hierarchy

    const taskComments = useSelector((state) =>
        selectTaskComments(state, task._id)
    )

    if (!taskComments || taskComments.length === 0) return <></>

    return (
        <div className="task-comments-badge">
            <Icon type="comment" size="xs" />
            <span className="label">{taskComments.length}</span>
        </div>
    )
}
