import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../types/HttpCodes";

export const validateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.email)
        res.status(HttpCodes.UNAUTHORIZED).json({ error: true, message: "Unauthorized" });
    else next();
}