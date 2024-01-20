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
        // TASK COMMENT
        case 'task-comment':
            return <TaskCommentDetails activity={activity} />

        // TASK CREATED
        case 'task-created':
            return (
                <TaskActivityDetails
                    activity={activity}
                    textBefore="added"
                    textAfter={`to ${activity.data.groupTitle}`}
                />
            )

        // TASK ARCHIVED
        case 'task-archived':
            return (
                <TaskActivityDetails
                    activity={activity}
                    textBefore="archived"
                />
            )

        // TASK UNARCHIVED
        case 'task-unarchived':
            return (
                <TaskActivityDetails
                    activity={activity}
                    textBefore="sent"
                    textAfter="to the board"
                />
            )

        // TASK DELETED
        case 'task-deleted':
            return (
                <TaskActivityDetails
                    activity={activity}
                    textBefore="deleted card"
                    textAfter={`from ${activity.data.groupTitle}`}
                    isLink={false}
                />
            )
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

export function TaskActivityDetails({
    activity,
    textBefore,
    textAfter,
    isLink = true,
}) {
    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div className="details-for-activity">
            <div className="description">
                <span className="user-fullname">{activity.user.fullname}</span>
                {` ${textBefore} `}
                {isLink ? (
                    <Link to={`c/${activity.taskId}`} className="task-link">
                        {activity.data.taskTitle}
                    </Link>
                ) : (
                    activity.data.taskTitle
                )}
                {textAfter && ` ${textAfter}`}
            </div>
            {isLink ? (
                <Link to={`c/${activity.taskId}`} className="performed-at">
                    {getPerformedAt()}
                </Link>
            ) : (
                getPerformedAt()
            )}
        </div>
    )
}
