import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";

export const helloRouter = Router();

helloRouter.get("/", (_, res) => {
    res.json({
        err: false,
        status: HttpCodes.OK,
        message: "Hello there!",
    } as CustomResponse);
});