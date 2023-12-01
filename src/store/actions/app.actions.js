import {
    SET_CUR_CHECKLIST,
    SET_CUR_CHECKLIST_ITEM,
} from '../reducers/app.reducer'
import { store } from '../store'

export { setCurChecklist, setCurChecklistItem }

function setCurChecklist(checklistId) {
    store.dispatch({ type: SET_CUR_CHECKLIST, checklistId })
}

function setCurChecklistItem(checklistId) {
    store.dispatch({ type: SET_CUR_CHECKLIST_ITEM, checklistId })
}
