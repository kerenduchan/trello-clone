import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export { showModal, hideModal, toggleModal }

function showModal(parent, title, content, className = null, e) {
    setModal({ parent, title, className, content, event: e })
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
