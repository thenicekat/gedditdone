// Source the env file
import 'dotenv/config'
import express, { Express } from 'express'
import { PORT } from './constants'
// Middleware
import { loggerMiddleware } from './middleware/logger.middleware'
import { errorsMiddleware } from './middleware/error.middleware'
// Routes
import { helloRouter } from './routes/hello'

const app: Express = express()

// Add middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)
app.use(errorsMiddleware)

// Add routes
app.use('/hello', helloRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})