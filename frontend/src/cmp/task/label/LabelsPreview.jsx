import { boardService } from '../../../services/board/board.service'
import { useToggle } from '../../../customHooks/useToggle'
import { LabelBtn } from './LabelBtn'
import { updateBoard } from '../../../store/actions/board/board.actions'

export function LabelsPreview({ hierarchy }) {
    const { board, task } = hierarchy

    function onLabelClick(e) {
        updateBoard(board, { isLabelsZoomedIn: !board.isLabelsZoomedIn })
        // stop propagation so that the task details won't be opened when
        // a label is clicked in the task preview.
        e.stopPropagation()
    }

    function getTaskLabels() {
        return task.labelIds
            .map((labelId) =>
                boardService.getItemById(board, 'labels', labelId)
            )
            .filter((label) => label && label.color.name !== 'none')
    }

    if (!task.labelIds?.length) return <></>

    return (
        <div className="labels-preview">
            <ul>
                {getTaskLabels().map((label) => (
                    <li key={label._id}>
                        <LabelBtn
                            label={label}
                            size={board.isLabelsZoomedIn ? 'md' : 'sm'}
                            onClick={onLabelClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
