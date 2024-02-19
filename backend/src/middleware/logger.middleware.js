"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = require("../utils/logger");
const loggerMiddleware = (req, _, next) => {
    // A logger middleware to log requests
    try {
        logger_1.logger.info(`[Logger Middleware]: ${req.method} ${req.path} ${req.method == 'POST' ? JSON.stringify(req.body) : JSON.stringify(req.params)}`);
    }
    catch (err) {
        logger_1.logger.info(`[Logger Middleware]: ${req.method} ${req.path} ${"No input provided"}`);
    }
    next();
};
exports.loggerMiddleware = loggerMiddleware;
