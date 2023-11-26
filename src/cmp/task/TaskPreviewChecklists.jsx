import { boardService } from '../../services/board.service'
import { Icon } from '../general/Icon'

export function TaskPreviewChecklists({ task }) {
    if (!task.checklists || task.checklists?.length === 0) return <></>
    return (
        <div className="task-preview-checklists">
            <Icon type="checklist" size="xs" />
            <span className="label">
                {boardService.countDoneItemsInAllChecklists(task)}/
                {boardService.countItemsInAllChecklists(task)}
            </span>
        </div>
    )
}
