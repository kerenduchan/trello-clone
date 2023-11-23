import { Icon } from '../general/Icon'
import { CircleBtn } from '../general/btn/CircleBtn'

export function TaskDetailsHeader({ task, onClose }) {
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
                <h1 className="title">{task.title}</h1>
                <p className="subtitle">
                    in list{' '}
                    <span className="group-title">{task.group.title}</span>
                </p>
            </div>
        </>
    )
}
