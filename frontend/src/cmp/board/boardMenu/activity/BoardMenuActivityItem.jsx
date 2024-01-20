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

function Details({ activity }) {
    function getGroupActivityDescription(activity) {
        const title = activity.data.groupTitle
        switch (activity.type) {
            case 'group-created':
                return ` added ${title} to this board`
            case 'group-archived':
                return `archived list ${title}`
            case 'group-unarchived':
                return `sent list ${title} to the board`
        }
    }

    switch (activity.type) {
        // TASK COMMENT
        case 'task-comment':
            return <TaskCommentDetails activity={activity} />

        // TASK CREATED
        case 'task-created':
            return (
                <ActivityDetailsTask
                    activity={activity}
                    textBefore="added"
                    textAfter={`to ${activity.data.groupTitle}`}
                />
            )

        // TASK ARCHIVED
        case 'task-archived':
            return (
                <ActivityDetailsTask
                    activity={activity}
                    textBefore="archived"
                />
            )

        // TASK UNARCHIVED
        case 'task-unarchived':
            return (
                <ActivityDetailsTask
                    activity={activity}
                    textBefore="sent"
                    textAfter="to the board"
                />
            )

        // TASK DELETED
        case 'task-deleted':
            return (
                <ActivityDetailsSimple
                    activity={activity}
                    text={`deleted ${activity.data.taskTitle} from ${activity.data.groupTitle}`}
                />
            )

        case 'group-created':
        case 'group-archived':
        case 'group-unarchived':
            return (
                <ActivityDetailsSimple
                    activity={activity}
                    text={getGroupActivityDescription(activity)}
                />
            )
    }
    return <></>
}

// TASK COMMENT
function TaskCommentDetails({ activity }) {
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

                <Link
                    to={`c/${activity.taskId}`}
                    className="performed-at small"
                >
                    {getPerformedAt()}
                </Link>
                {activity.data.isEdited && (
                    <span className="small"> (edited)</span>
                )}
            </div>
            <div className="comment-box">
                <p>{activity.data.text}</p>
            </div>
        </div>
    )
}

function ActivityDetailsTask({ activity, textBefore, textAfter }) {
    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div className="details-for-activity">
            <div className="description">
                <span className="user-fullname">{activity.user.fullname}</span>
                {` ${textBefore} `}
                <Link to={`c/${activity.taskId}`} className="task-link">
                    {activity.data.taskTitle}
                </Link>
                {textAfter && ` ${textAfter}`}
            </div>
            <Link to={`c/${activity.taskId}`} className="performed-at small">
                {getPerformedAt()}
            </Link>
        </div>
    )
}

function ActivityDetailsSimple({ activity, text }) {
    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div className="details-for-activity">
            <div className="description">
                <span className="user-fullname">{activity.user.fullname}</span>
                {` ${text}`}
            </div>
            <div className="small">{getPerformedAt()}</div>
        </div>
    )
}
