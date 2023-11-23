import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export { showModal, hideModal, toggleModal }

function showModal(parent, title, content, className = null, e) {
    // stop propagation, otherwise the app will close the modal
    e.stopPropagation()

    // save the current target because it becomes null once the event handling
    // is done
    setModal({
        parent,
        title,
        className,
        content,
        el: e.currentTarget,
    })
}

function toggleModal(parent, title, content, className = null, e) {
    store.getState().appModule.modal?.parent === parent
        ? hideModal()
        : showModal(parent, title, content, className, e)
}

function hideModal() {
    setModal(null)
}

function setModal(modal = null) {
    store.dispatch({
        type: SET_MODAL,
        modal,
    })
}
