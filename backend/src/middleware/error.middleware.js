"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsMiddleware = void 0;
const logger_1 = require("../utils/logger");
const HttpCodes_1 = require("../types/HttpCodes");
const errorsMiddleware = (error, req, res, _) => {
    // Error middleware to handle errors in between
    const status = error.status || HttpCodes_1.HttpCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(status).json({
        err: true,
        status,
        message,
        data: {}
    });
    try {
        logger_1.logger.error(`[Error Middleware]: ${status} ${message} at ${req.method} ${req.path} ${req.method == 'POST' ? JSON.stringify(req.body) : JSON.stringify(req.params) + " " + JSON.stringify(req.query)}`);
    }
    catch (err) {
        logger_1.logger.error(`[Error Middleware]: ${status} ${message} at ${req.method} ${req.path} ${"No input provided"}`);
    }
};
exports.errorsMiddleware = errorsMiddleware;
