import moment from 'moment'
import { activityUtilService } from '../../../services/activity/activity.util.service'
import { userService } from '../../../services/user/user.service'
import { store } from '../../../store/store'
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

    function getUserFullname() {
        const user = store
            .getState()
            .board.curBoard.members.find((m) => m._id === activity.userId)
        return user.fullname
    }

    // todo: real image
    return (
        <div className="task-activity-non-comment-item">
            <Avatar imgSrc={userService.getImgUrl()} />
            <div className="details">
                <div className="description">
                    <span className="user-fullname">{getUserFullname()}</span>
                    {getDescription()}
                </div>
                <div className="performed-at" onClick={onClick}>
                    {getPerformedAt()}
                </div>
            </div>
        </div>
    )
}
