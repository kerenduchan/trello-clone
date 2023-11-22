import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from 'redux'
import { boardReducer } from './reducers/board.reducer'
import { appReducer } from './reducers/app.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    boardModule: boardReducer,
    appModule: appReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
