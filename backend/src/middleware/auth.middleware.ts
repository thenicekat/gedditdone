import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { logger } from "../utils/logger";

export const validateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.email) {
        logger.error("[Auth Middleware]: Unauthorized, Session has: ", req.session.email)
        res.status(HttpCodes.UNAUTHORIZED).json({ error: true, message: "Unauthorized" });
    }
    else next();
}