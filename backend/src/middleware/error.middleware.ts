import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { CustomException } from "../types/CustomException";
import { HttpCodes } from "../types/HttpCodes";

export const errorsMiddleware = (error: CustomException, req: Request, res: Response, _: NextFunction) => {
    // Error middleware to handle errors in between
    const status = error.status || HttpCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(status).json({
        error: true,
        status,
        message,
        data: {}
    })
    try {
        logger.error(`[Error Middleware]: ${status} ${message} at ${req.method} ${req.path} ${req.method == 'POST' ? JSON.stringify(req.body) : JSON.stringify(req.params) + " " + JSON.stringify(req.query)}`);
    }
    catch (err) {
        logger.error(`[Error Middleware]: ${status} ${message} at ${req.method} ${req.path} ${"No input provided"}`);
    }
}