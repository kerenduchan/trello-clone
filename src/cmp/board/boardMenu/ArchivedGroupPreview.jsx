import { Icon } from '../../general/Icon'

export function ArchivedGroupPreview({ group, onUnarchive }) {
    return (
        <div className="archived-group-preview">
            <div className="title">{group.title}</div>
            <button
                className="btn-unarchive btn-secondary"
                onClick={() => onUnarchive(group)}
            >
                <Icon type="unarchive" />
                <span>Send to board</span>
            </button>
        </div>
    )
}
