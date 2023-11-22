import { store } from './../store'
import { SET_MODAL } from './../reducers/app.reducer'

export function onSetModal(modal = null) {
    store.dispatch({
        type: SET_MODAL,
        modal,
    })
}
