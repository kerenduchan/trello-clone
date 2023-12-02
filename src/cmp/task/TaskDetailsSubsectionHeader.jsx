import { Icon } from '../general/Icon'

export function TaskDetailsSubsectionHeader({ icon, title, children }) {
    return (
        <div className="task-details-subsection-header">
            <Icon type={icon} size="md" />
            <h2 className="title">{title}</h2>
            <div className="btn-title">{children}</div>
        </div>
    )
}
