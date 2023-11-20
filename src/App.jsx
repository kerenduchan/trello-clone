import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppHeader } from './cmp/AppHeader'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'

function App() {
    return (
        <div id="app">
            <AppHeader />
            <div className="app-content">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/boards" element={<BoardIndex />} />
                        <Route path="/b/:boardId" element={<BoardDetails />}>
                            <Route
                                path="/b/:boardId/c/:taskId"
                                element={<TaskDetails />}
                            ></Route>
                        </Route>
                    </Routes>
                </Router>
            </div>
        </div>
    )
}

export default App
