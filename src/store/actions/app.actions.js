import {
    curChecklistChanged,
    curChecklistItemChanged,
} from '../reducers/app.reducer'
import { store } from '../store'

export { setCurChecklist, setCurChecklistItem }

function setCurChecklist(checklistId) {
    store.dispatch(curChecklistChanged(checklistId))
}

function setCurChecklistItem(checklistItemId) {
    store.dispatch(curChecklistItemChanged(checklistItemId))
}
