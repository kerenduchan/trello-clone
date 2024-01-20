import moment from 'moment'
import { Link } from 'react-router-dom'
import { userService } from '../../../../services/user/user.service'
import { Avatar } from '../../../general/Avatar'

export function BoardMenuActivityItem({ activity }) {
    return (
        <div className="board-menu-activity-item">
            <Avatar imgSrc={userService.getImgUrl(activity.user)} />
            <Details activity={activity} />
        </div>
    )
}

export function Details({ activity }) {
    switch (activity.type) {
        case 'task-comment':
            return <TaskCommentDetails activity={activity} />
        case 'task-created':
            return <TaskCreatedDetails activity={activity} />
        case 'task-deleted':
            return <TaskDeletedDetails activity={activity} />
    }
    return <></>
}

// TASK COMMENT
export function TaskCommentDetails({ activity }) {
    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div className="details-for-task-comment">
            <div className="description">
                <span className="user-fullname">{activity.user.fullname}</span>
                {' on '}
                <Link to={`c/${activity.taskId}`} className="task-link">
                    {activity.data.taskTitle}
                </Link>

                <Link to={`c/${activity.taskId}`} className="performed-at">
                    {getPerformedAt()}
                </Link>
                {activity.data.isEdited && (
                    <span className="is-edited"> (edited)</span>
                )}
            </div>
            <div className="comment-box">
                <p>{activity.data.text}</p>
            </div>
        </div>
    )
}

export function NonCommentActivityDetails({ activity, children }) {
    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div className="details-for-activity">
            <div className="description">
                <span className="user-fullname">{activity.user.fullname}</span>
                {children}
            </div>
            <Link to={`c/${activity.taskId}`} className="performed-at">
                {getPerformedAt()}
            </Link>
        </div>
    )
}

// TASK CREATED
export function TaskCreatedDetails({ activity }) {
    return (
        <NonCommentActivityDetails activity={activity}>
            {' added '}
            <Link to={`c/${activity.taskId}`} className="task-link">
                {activity.data.taskTitle}
            </Link>
            {' to '}
            {activity.data.groupTitle}
        </NonCommentActivityDetails>
    )
}

// TASK DELETED
export function TaskDeletedDetails({ activity }) {
    return (
        <NonCommentActivityDetails activity={activity}>
            {` deleted card ${activity.data.taskTitle} from ${activity.data.groupTitle}`}
        </NonCommentActivityDetails>
    )
}
