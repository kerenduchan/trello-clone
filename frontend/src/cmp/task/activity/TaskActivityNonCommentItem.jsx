import moment from 'moment'
import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'

export function TaskActivityNonCommentItem({
    hierarchy,
    activity,
    isSelected,
    onClick,
}) {
    function getDescription() {
        switch (activity.type) {
            // TASK CREATED
            case 'task-created':
                return 'added this card to ' + activity.data.groupTitle

            // TASK ARCHIVED
            case 'task-archived':
                return 'archived this card'

            // TASK UNARCHIVED
            case 'task-unarchived':
                return 'sent this card to the board'
        }
    }

    function getPerformedAt() {
        return moment(activity.performedAt).fromNow()
    }

    return (
        <div
            className={`task-activity-non-comment-item ${
                isSelected ? 'selected' : ''
            }`}
        >
            <Avatar imgSrc={userService.getImgUrl(activity.user)} />
            <div className="details">
                <div className="description">
                    <span className="user-fullname">
                        {activity.user.fullname}
                    </span>
                    {` ${getDescription()}`}
                </div>
                <div className="performed-at" onClick={onClick}>
                    {getPerformedAt()}
                </div>
            </div>
        </div>
    )
}
