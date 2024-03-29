import { boardService } from '../../../services/board/board.service'
import { Icon } from '../../general/Icon'

export function ChecklistsBadge({ hierarchy }) {
    const { task } = hierarchy

    if (!task.checklists || task.checklists?.length === 0) return <></>

    const doneCount = boardService.countDoneItemsInAllChecklists(task)
    const allCount = boardService.countItemsInAllChecklists(task)

    if (allCount === 0) return <></>

    return (
        <div
            className={`checklists-badge ${
                doneCount === allCount ? 'done' : ''
            }`}
        >
            <Icon type="checklist" size="xs" />
            <span className="label">
                {doneCount}/{allCount}
            </span>
        </div>
    )
}
