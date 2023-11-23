import { useSelector } from 'react-redux'
import { hideModal } from '../../store/actions/app.actions'
import { buildClassName } from '../../util'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function AppModal() {
    const modal = useSelector((storeState) => storeState.appModule.modal)

    function onClose() {
        hideModal()
    }

    function calcPosition() {
        if (!modal) return null

        const rect = modal.el.getBoundingClientRect()
        return { top: rect.top + rect.height + 6, left: rect.left }
    }

    if (!modal) return <></>
    return (
        <div
            className={buildClassName('app-modal', modal.className)}
            style={calcPosition()}
        >
            <div>
                <header>
                    <h2>{modal.title}</h2>
                    <SquareIconBtn onClick={onClose} icon="close" />
                </header>
                <div className="content">{modal.content}</div>
            </div>
        </div>
    )
}
