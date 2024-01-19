import { deleteActivity } from '../../../store/actions/activity/activity.actions'
import { TaskComment } from '../comments/TaskComment'
import { TaskActivityNonCommentItem } from './TaskActivityNonCommentItem'

export function TaskActivityItem({ hierarchy, activity, isSelected, onClick }) {
    function onDelete() {
        deleteActivity(activity)
    }

    return (
        <div className="task-activity-item">
            {activity.type === 'task-comment' ? (
                <TaskComment
                    hierarchy={hierarchy}
                    activity={activity}
                    isSelected={isSelected}
                    onClick={onClick}
                    onDelete={onDelete}
                />
            ) : (
                <TaskActivityNonCommentItem
                    hierarchy={hierarchy}
                    activity={activity}
                    isSelected={isSelected}
                    onClick={onClick}
                />
            )}
        </div>
    )
}
