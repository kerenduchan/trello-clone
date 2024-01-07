import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { authService } from './services/auth.service'
import { LoginContext } from './contexts/LoginContext'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

function App() {
    const [loggedinUser, setLoggedinUser] = useState(
        authService.getLoggedinUser()
    )

    return (
        <LoginContext.Provider value={{ loggedinUser, setLoggedinUser }}>
            <div id="app">
                <Router>
                    <div className="app-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Login />} />
                            <Route path="/boards" element={<BoardIndex />} />
                            <Route
                                path="/b/:boardId"
                                element={<BoardDetails />}
                            >
                                <Route
                                    path="/b/:boardId/c/:taskId"
                                    element={<TaskDetails />}
                                ></Route>
                            </Route>
                        </Routes>
                    </div>
                </Router>
            </div>
        </LoginContext.Provider>
    )
}

export default App
