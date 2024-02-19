import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { helloService } from "../service/hello.service";

export const helloRouter = Router();

helloRouter.get("/", (_, res) => {
    const response: CustomResponse = {
        error: false,
        message: helloService(),
        data: null
    }

    res.status(HttpCodes.OK).json(response);
});