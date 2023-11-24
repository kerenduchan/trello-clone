import { store } from './../store'
import { SET_POPOVER } from './../reducers/app.reducer'

export { showPopover, hidePopover, togglePopover }

function showPopover(popover) {
    // stop propagation, otherwise the app will close the popover
    popover.event.stopPropagation()

    // save the current target because it becomes null once the event handling
    // is done
    _setPopover(popover)
}

function togglePopover(popover) {
    store.getState().appModule.popover?.el === popover.el
        ? hidePopover()
        : showPopover(popover)
}

function hidePopover() {
    _setPopover(null)
}

function _setPopover(popover = null) {
    store.dispatch({
        type: SET_POPOVER,
        popover,
    })
}
