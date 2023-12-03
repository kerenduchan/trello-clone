import moment from 'moment/moment'
import { boardService } from '../../../services/board.service'
import { Avatar } from '../../general/Avatar'

export function TaskCommentsItem({ hierarchy, item, isSelected, onClick }) {
    const { board } = hierarchy

    function getCreatedBy() {
        return boardService.getBoardFieldItemById(
            board,
            'members',
            item.createdBy
        )
    }

    function getCreatedAt() {
        return moment(item.createdAt).fromNow()
    }

    const createdBy = getCreatedBy()

    return (
        <div className={`task-comments-item ${isSelected ? 'selected' : ''}`}>
            <div className="created-by-avatar">
                <Avatar imgSrc={createdBy.imgUrl} />
            </div>
            <div className="heading">
                <span className="created-by-fullname">
                    {createdBy.fullname}
                </span>
                <span className="created-at" onClick={onClick}>
                    {getCreatedAt()}
                </span>
            </div>
            <div className="text">{item.text}</div>
            <div className="actions"></div>
        </div>
    )
}
