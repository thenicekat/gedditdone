"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Source the env file
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
// Middleware
const logger_middleware_1 = require("./middleware/logger.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
// Routes
const hello_route_1 = require("./routes/hello.route");
const posts_route_1 = require("./routes/posts.route");
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
// Add middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_middleware_1.loggerMiddleware);
app.use(error_middleware_1.errorsMiddleware);
app.use((0, express_session_1.default)({
    secret: constants_1.SESSIONKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
    },
}));
// Add routes
app.use('/hello', hello_route_1.helloRouter);
app.use('/posts', posts_route_1.postsRouter);
// Start the server
app.listen(constants_1.PORT, () => {
    console.log(`Server listening on port ${constants_1.PORT}`);
});
