import { Icon } from '../../general/Icon'

export function ChecklistHeaderEdit({ title, onClose }) {
    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="checklist-header-edit">
            <form onSubmit={onSubmit}>
                <textarea />
                <div className="actions">
                    <button className="btn-primary">Save</button>
                    <button
                        className="btn-close"
                        type="button"
                        onClick={onClose}
                    >
                        <Icon type="close" size="md" />
                    </button>
                </div>
            </form>
        </div>
    )
}
