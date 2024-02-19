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
exports.createPost = exports.getMyPosts = exports.getAllPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allPosts = yield prisma.post.findMany();
        return {
            error: false,
            data: allPosts
        };
    }
    catch (error) {
        return {
            error: true,
            data: error
        };
    }
});
exports.getAllPosts = getAllPosts;
const getMyPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myPosts = yield prisma.post.findMany({
            where: {
                authorId: userId
            }
        });
        return {
            error: false,
            data: myPosts
        };
    }
    catch (error) {
        return {
            error: true,
            data: error
        };
    }
});
exports.getMyPosts = getMyPosts;
const createPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let createPost = yield prisma.post.create({
            data: {
                source: data.source,
                destination: data.destination,
                authorId: data.authorId,
                costInPoints: data.costInPoints,
                service: data.service
            }
        });
        return {
            error: false,
            data: createPost
        };
    }
    catch (error) {
        return {
            error: true,
            data: error
        };
    }
});
exports.createPost = createPost;
