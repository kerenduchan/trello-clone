import moment from 'moment'
import { activityUtilService } from '../../../services/activity/activity.util.service'
import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'

export function TaskActivityNonCommentItem({
    hierarchy,
    activity,
    isSelected,
    onClick,
}) {
    function getDescription() {
        return ' ' + activityUtilService.getDescription(activity)
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
                    {getDescription()}
                </div>
                <div className="performed-at" onClick={onClick}>
                    {getPerformedAt()}
                </div>
            </div>
        </div>
    )
}
