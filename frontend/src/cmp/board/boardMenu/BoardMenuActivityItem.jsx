import moment from 'moment'
import { Link } from 'react-router-dom'
import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'

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
        case 'task-created':
            return <DetailsForCreateTask activity={activity} />
        case 'task-deleted':
            return <DetailsForDeleteTask activity={activity} />
        case 'task-comment':
            return <DetailsForTaskComment activity={activity} />
    }
    return <></>
}

export function DetailsForCreateTask({ activity }) {
    return (
        <DetailsForActivity activity={activity}>
            {' added '}
            <Link to={`c/${activity.taskId}`} className="task-link">
                {activity.data.taskTitle}
            </Link>
            {' to '}
            {activity.data.groupTitle}
        </DetailsForActivity>
    )
}

export function DetailsForDeleteTask({ activity }) {
    return (
        <DetailsForActivity activity={activity}>
            {` deleted card ${activity.data.taskTitle} from ${activity.data.groupTitle}`}
        </DetailsForActivity>
    )
}

export function DetailsForActivity({ activity, children }) {
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

export function DetailsForTaskComment({ activity }) {
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
