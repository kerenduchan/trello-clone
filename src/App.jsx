import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppHeader } from './cmp/AppHeader'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'
import { Popover } from './cmp/general/Popover'
import { hidePopover } from './store/actions/app.actions'

function App() {
    return (
        <div id="app" onClick={hidePopover}>
            <Router>
                <AppHeader />
                <div className="app-content">
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
                </div>
                <Popover />
            </Router>
        </div>
    )
}

export default App
