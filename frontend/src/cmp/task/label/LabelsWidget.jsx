import { boardService } from '../../../services/board/board.service'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { LabelBtn } from './LabelBtn'
import { LabelsMenu } from '../../labelsMenu/LabelsMenu'
import { Icon } from '../../general/Icon'

export function LabelsWidget({ hierarchy }) {
    const labels = boardService.getTaskLabels(hierarchy)
    const labelsMenu = usePopoverState()

    return (
        <>
            <section className="labels-widget">
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
                            <li key="add">
                                <button
                                    className="btn-square-sharp btn-add"
                                    {...labelsMenu.trigger}
                                >
                                    <Icon type="add" />
                                </button>
                            </li>
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
