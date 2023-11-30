import { SET_NEW_CHECKLIST } from '../reducers/app.reducer'
import { store } from '../store'

export { setNewChecklist }

function setNewChecklist(checklistId) {
    store.dispatch({ type: SET_NEW_CHECKLIST, checklistId })
}
