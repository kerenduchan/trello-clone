import { Icon } from '../../general/Icon'

export function TaskAttachmentsBadge({ hierarchy }) {
    const { task } = hierarchy
    const { attachments } = task

    if (!attachments || attachments.length === 0) return <></>

    return (
        <div className="task-attachments-badge">
            <Icon type="attachment" size="xs" />
            <span className="label">{attachments.length}</span>
        </div>
    )
}
