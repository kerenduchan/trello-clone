import moment from 'moment'
import { Icon } from '../../general/Icon'

export function TaskAttachment({ hierarchy, attachment }) {
    console.log(attachment)
    function getTitle() {
        const { title, fileUrl } = attachment
        if (title) {
            return title
        }

        const urlParts = fileUrl.split('/')
        return urlParts[urlParts.length - 1]
    }

    function getCreationTime() {
        return moment(attachment.createdAt).fromNow()
    }

    return (
        <div className="task-attachment">
            <div
                className="preview"
                style={{ backgroundImage: `url(${attachment.fileUrl})` }}
            />
            <div className="details">
                <div className="title">{getTitle()}</div>

                <div className="actions">
                    <span className="creation-time">
                        Added {getCreationTime()}
                    </span>
                    <span> • </span>

                    <span className="action btn-link-small delete">Delete</span>
                    <span> • </span>
                    <span className="action btn-link-small edit">Edit</span>
                </div>
                <div className="make-cover">
                    <Icon type="cover" />
                    <span className="btn-link-small">Make cover</span>
                </div>
            </div>
        </div>
    )
}
