import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { getDbUrl } from './db/config.js'

import { loggerService } from './services/logger.service.js'

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
}

const app = express()
const port = process.env.PORT || 3000

// App configuration
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// Routes
import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { boardRoutes } from './api/board/board.routes.js'
import { groupRoutes } from './api/group/group.routes.js'
import { taskRoutes } from './api/task/task.routes.js'
import { activityRoutes } from './api/activity/activity.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
app.use('/api/board', groupRoutes)
app.use('/api/board', taskRoutes)
app.use('/api/activity', activityRoutes)

// fallback route
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

// connect to the DB
mongoose.connect(getDbUrl())

// start the server on port 3030
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    loggerService.info(`Up and running on port ${port}`)
})
