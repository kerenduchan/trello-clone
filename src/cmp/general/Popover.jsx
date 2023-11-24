import { useSelector } from 'react-redux'
import { hidePopover } from '../../store/actions/app.actions'
import { buildClassName } from '../../util'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function Popover() {
    const popover = useSelector((storeState) => storeState.appModule.popover)

    function calcPosition() {
        if (!popover) return null
        const rect = popover.el.getBoundingClientRect()

        let left = rect.left
        const overflowY = left + 400 - window.innerWidth

        if (overflowY > 0) {
            left -= overflowY
        }

        return { top: rect.top + rect.height + 6, left }
    }

    if (!popover) return <></>
    return (
        <div
            className={buildClassName('popover', popover.className)}
            style={calcPosition()}
            onClick={(e) => e.stopPropagation()}
        >
            <div>
                <header>
                    <h2>{popover.title}</h2>
                    <SquareIconBtn onClick={hidePopover} icon="close" />
                </header>
                <div className="content">{popover.content}</div>
            </div>
        </div>
    )
}
