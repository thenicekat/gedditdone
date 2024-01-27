import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
    // A logger middleware to log requests
    try {
        logger.info(`[Logger Middleware]: ${req.method} ${req.path} ${req.method == 'POST' ? JSON.stringify(req.body) : JSON.stringify(req.params)}`)
    } catch (err) {
        logger.info(`[Logger Middleware]: ${req.method} ${req.path} ${"No input provided"}`)
    }
    next();
}