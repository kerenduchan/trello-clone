import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from 'redux'
import { appReducer } from './reducers/app.reducer'
import { boardReducer } from './reducers/board.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    appModule: appReducer,
    boardModule: boardReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
