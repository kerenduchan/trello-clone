import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export { showModal, hideModal, toggleModal }

function showModal(title, content, className = null) {
    setModal({ title, className, content })
}

function toggleModal(title, content, className = null) {
    store.getState().appModule.modal
        ? hideModal()
        : showModal(title, content, className)
}

function hideModal() {
    console.log()
    setModal(null)
}

function setModal(modal = null) {
    store.dispatch({
        type: SET_MODAL,
        modal,
    })
}
