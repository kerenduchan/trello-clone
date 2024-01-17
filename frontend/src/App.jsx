import { useEffect } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loggedinUserChanged } from './store/reducers/app.reducer'
import { authService } from './services/auth/auth.service'
import { Home } from './pages/Home'
import { LoginSignup } from './pages/LoginSignup'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const user = authService.getLoggedinUser()
        dispatch(loggedinUserChanged(user))
    }, [])

    return (
        <div id="app">
            <Router>
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginSignup />} />
                        <Route path="/signup" element={<LoginSignup />} />
                        <Route path="/boards" element={<BoardIndex />} />
                        <Route path="/b/:boardId" element={<BoardDetails />}>
                            <Route
                                path="/b/:boardId/c/:taskId"
                                element={<TaskDetails />}
                            ></Route>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App
