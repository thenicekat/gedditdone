"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const HttpCodes_1 = require("../types/HttpCodes");
const posts_service_1 = require("../service/posts.service");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get("/all", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield (0, posts_service_1.getAllPosts)();
    if (allPosts.error) {
        const response = {
            err: true,
            message: "Error retrieving posts",
            data: null
        };
        return res.status(HttpCodes_1.HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const response = {
        err: false,
        message: "All posts retrieved successfully",
        data: allPosts.data
    };
    return res.status(HttpCodes_1.HttpCodes.OK).json(response);
}));
