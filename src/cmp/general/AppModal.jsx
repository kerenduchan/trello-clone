import { useSelector } from 'react-redux'
import { onSetModal } from '../../store/actions/app.actions'
import { buildClassName } from '../../util'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function AppModal({ title, className, children }) {
    const modal = useSelector((storeState) => storeState.appModule.modal)

    function onClose() {
        onSetModal(null)
    }

    if (!modal) return <></>
    return (
        <div className={buildClassName('app-modal', className)}>
            <div>
                <header>
                    <h2>{title}</h2>
                    <SquareIconBtn onClick={onClose} icon="close" />
                </header>
                <div className="content">{children}</div>
            </div>
        </div>
    )
}
