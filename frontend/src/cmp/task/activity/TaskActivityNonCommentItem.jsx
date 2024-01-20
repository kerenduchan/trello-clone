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
                return 'added this card to ' + activity.groupTitle

            // TASK ARCHIVED
            case 'task-archived':
                return 'archived this card'

            // TASK UNARCHIVED
            case 'task-unarchived':
                return 'sent this card to the board'

            // CHECKLIST ADDED
            case 'task-checklist-added':
                return `added ${activity.checklistTitle} to this card`

            // CHECKLIST DELETED
            case 'task-checklist-deleted':
                return `removed ${activity.checklistTitle} from this card`
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
