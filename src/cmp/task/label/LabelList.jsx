import { boardService } from '../../../services/board.service'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { LabelBtn } from './LabelBtn'
import { LabelsMenu } from './LabelsMenu'

export function LabelList({ hierarchy }) {
    const labels = boardService.getTaskLabels(hierarchy)
    const labelsMenu = usePopoverState()

    return (
        <>
            <section className="label-list">
                {!!labels?.length && (
                    <>
                        <h3>Labels</h3>
                        <ul {...labelsMenu.target}>
                            {labels.map((label) => (
                                <li key={label._id}>
                                    <LabelBtn
                                        label={label}
                                        {...labelsMenu.trigger}
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </section>

            {/* Labels menu */}
            {labelsMenu.show && (
                <LabelsMenu hierarchy={hierarchy} labelsMenu={labelsMenu} />
            )}
        </>
    )
}
