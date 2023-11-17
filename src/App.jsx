import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { User } from './pages/User'
import { Workspace } from './pages/Workspace'
import { Board } from './pages/Board'

function App() {
    return (
        <div id="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/u/:userId/" element={<User />}>
                        <Route
                            path="/u/:userId/boards"
                            element={<Workspace />}
                        />
                    </Route>
                    <Route
                        path="/b/:boardId/:slug?"
                        element={<Board />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
