import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { getAllPosts } from "../service/posts.service";

export const postsRouter = Router();

postsRouter.get("/all", async (_, res) => {
    const allPosts = await getAllPosts();

    if (allPosts.error) {
        const response: CustomResponse = {
            err: true,
            message: "Error retrieving posts",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);

    }

    const response: CustomResponse = {
        err: false,
        message: "All posts retrieved successfully",
        data: allPosts.data
    }
    return res.status(HttpCodes.OK).json(response);
})