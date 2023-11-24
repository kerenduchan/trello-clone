import { store } from './../store'
import { SET_POPOVER } from './../reducers/app.reducer'

export { showPopover, hidePopover, togglePopover }

function showPopover(parent, title, content, className = null, e) {
    // stop propagation, otherwise the app will close the popover
    e.stopPropagation()

    // save the current target because it becomes null once the event handling
    // is done
    setPopover({
        parent,
        title,
        className,
        content,
        el: e.currentTarget,
    })
}

function togglePopover(parent, title, content, className = null, e) {
    store.getState().appModule.popover?.parent === parent
        ? hidePopover()
        : showPopover(parent, title, content, className, e)
}

function hidePopover() {
    setPopover(null)
}

function setPopover(popover = null) {
    store.dispatch({
        type: SET_POPOVER,
        popover,
    })
}
