// Source the env file
import 'dotenv/config'
import express, { Express } from 'express'
import session, { CookieOptions } from 'express-session'
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);


import { DATABASE_URL, FRONTEND_URL, PORT, SESSIONKEY, __prod__ } from './constants'
// Middleware
import { loggerMiddleware } from './middleware/logger.middleware'
import { errorsMiddleware } from './middleware/error.middleware'
// Routes
import { helloRouter } from './routes/hello.route'
import { postsRouter } from './routes/posts.route'
import { gauthRouter } from './routes/gauth.route'
import { userRouter } from './routes/user.route'
import { validateMiddleware } from './middleware/auth.middleware';
import { requestsRouter } from './routes/requests.route';
import { adminRouter } from './routes/admin.route';
import { reportsRouter } from './routes/report.route';
const app: Express = express()
app.disable("x-powered-by");

// Add Config
app.set("trust proxy", 1);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
let corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: FRONTEND_URL
}
app.use(cors(corsOptions))

// Add session middleware
const store = new MongoDBStore({
    uri: DATABASE_URL,
    collection: 'Session'
});
declare module "express-session" {
    interface SessionData {
        email: string
    }
}
const cookieConfig: CookieOptions = __prod__ ? {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
} : {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
}
app.use(session({
    name: "geddit-session",
    store: store,
    proxy: true,
    secret: SESSIONKEY,
    resave: false,
    saveUninitialized: true,
    cookie: cookieConfig,
}))
app.use(loggerMiddleware)
app.use(errorsMiddleware)


// Not validated routes
app.use("/oauth/google", gauthRouter)

// Validated routes
app.use(validateMiddleware)
app.use('/hello', helloRouter)
app.use('/post', postsRouter)
app.use('/request', requestsRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter);
app.use('/report', reportsRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})