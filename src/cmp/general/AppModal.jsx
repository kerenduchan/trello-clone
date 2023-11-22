import { useSelector } from 'react-redux'
import { hideModal } from '../../store/actions/app.actions'
import { buildClassName } from '../../util'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function AppModal() {
    const modal = useSelector((storeState) => storeState.appModule.modal)

    function onClose() {
        hideModal()
    }

    if (!modal) return <></>
    return (
        <div className={buildClassName('app-modal', modal.className)}>
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
