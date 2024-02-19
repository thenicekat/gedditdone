"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloRouter = void 0;
const express_1 = require("express");
const HttpCodes_1 = require("../types/HttpCodes");
const hello_service_1 = require("../service/hello.service");
exports.helloRouter = (0, express_1.Router)();
exports.helloRouter.get("/", (_, res) => {
    const response = {
        err: false,
        message: (0, hello_service_1.helloService)(),
        data: null
    };
    res.status(HttpCodes_1.HttpCodes.OK).json(response);
});
