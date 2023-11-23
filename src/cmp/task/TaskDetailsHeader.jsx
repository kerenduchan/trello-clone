import { Icon } from '../general/Icon'
import { CircleBtn } from '../general/btn/CircleBtn'
import { EditableTitle } from '../general/EditableTitle'

export function TaskDetailsHeader({ task, onClose }) {
    function onTitleChange() {
        console.log('on title change')
    }
    return (
        <>
            <CircleBtn type="close" onClick={onClose} />
            {task.cover && (
                <div
                    className="cover"
                    style={{
                        backgroundColor: task.cover.bgColor,
                    }}
                ></div>
            )}

            <div className="task-details-header">
                <Icon type="card" size="md" />
                <EditableTitle title={task.title} onChange={onTitleChange} />
                <p className="subtitle">
                    in list{' '}
                    <span className="group-title">{task.group.title}</span>
                </p>
            </div>
        </>
    )
}
