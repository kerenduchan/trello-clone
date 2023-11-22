import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export { showModal, hideModal }

function showModal(title, content, className = null) {
    setModal({ title, className, content })
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
