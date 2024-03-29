import { configureStore } from '@reduxjs/toolkit'

import appReducer from './reducers/app.reducer'
import boardReducer from './reducers/board.reducer'

export const store = configureStore({
    reducer: {
        app: appReducer,
        board: boardReducer,
    },
})
