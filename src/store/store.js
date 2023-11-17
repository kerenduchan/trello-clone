import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from 'redux'
import { boardReducer } from './reducers/board.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    boardModule: boardReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
