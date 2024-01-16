import { Icon } from '../../general/Icon'

export function TaskCommentsBadge({ hierarchy }) {
    const { task } = hierarchy

    if (!task.comments || task.comments?.length === 0) return <></>

    return (
        <div className="task-comments-badge">
            <Icon type="comment" size="xs" />
            <span className="label">{task.comments.length}</span>
        </div>
    )
}
