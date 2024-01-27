import { Icon } from '../general/Icon'

export function BoardShare() {
    return (
        <div className="board-share">
            <button className="btn-share">
                <Icon type="add_member" size="xs"></Icon>
                <span className="label">Share</span>
            </button>
        </div>
    )
}
