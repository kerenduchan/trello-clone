import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export { showModal, hideModal, toggleModal }

function showModal(parent, title, content, className = null) {
    setModal({ parent, title, className, content })
}

function toggleModal(parent, title, content, className = null) {
    store.getState().appModule.modal?.parent === parent
        ? hideModal()
        : showModal(parent, title, content, className)
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
