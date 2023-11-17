import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { User } from './pages/User'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'

function App() {
    return (
        <div id="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/u/:userId" element={<User />}>
                        <Route
                            path="/u/:userId/boards"
                            element={<BoardIndex />}
                        />
                    </Route>
                    <Route
                        path="/b/:boardId"
                        element={<BoardDetails />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
