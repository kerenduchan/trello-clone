import {
    removeTaskLabel,
    addTaskLabel,
} from '../../../store/actions/board.actions'
import { useToggle } from '../../../customHooks/useToggle'
import { Icon } from '../../general/Icon'

export function LabelsMenuMainItem({ hierarchy, label, onEditClick }) {
    const { task } = hierarchy
    const [isChecked, toggleIsChecked] = useToggle(
        task.labelIds.includes(label._id)
    )

    function onClick() {
        try {
            if (isChecked) {
                // remove label from task
                removeTaskLabel(hierarchy, label)
            } else {
                // add label to task
                addTaskLabel(hierarchy, label)
            }
            toggleIsChecked()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="labels-menu-item">
            <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onClick}
            />
            <div
                className="label"
                style={{ backgroundColor: label.color }}
                onClick={onClick}
            >
                {label.title}
            </div>

            <button
                className="btn-square-sharp btn-edit"
                onClick={() => onEditClick(label)}
            >
                <Icon type="edit" size="xs" />
            </button>
        </div>
    )
}
