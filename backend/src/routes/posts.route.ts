import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { createPost, getAllPosts, getMyPosts } from "../service/posts.service";

export const postsRouter = Router();

postsRouter.get("/all", async (_, res) => {
    const allPosts = await getAllPosts();

    if (allPosts.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving posts",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);

    }

    const response: CustomResponse = {
        error: false,
        message: "All posts retrieved successfully",
        data: allPosts.data
    }
    return res.status(HttpCodes.OK).json(response);
})

postsRouter.get("/my", async (req, res) => {
    const authorEmail = req.session.email as string;

    const myPosts = await getMyPosts(authorEmail);

    if (myPosts.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving posts",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "My posts retrieved successfully",
        data: myPosts.data
    }
    return res.status(HttpCodes.OK).json(response);
})

postsRouter.post("/create", async (req, res) => {
    const source = req.body.source as string;
    const destination = req.body.destination as string;
    const service = req.body.service as string;
    const costInPoints = parseInt(req.body.costInPoints) as number;

    const authorEmail = req.session.email as string;

    const crePost = await createPost({
        authorEmail,
        source,
        destination,
        service,
        costInPoints
    });

    if (crePost.error) {
        const response: CustomResponse = {
            error: true,
            message: crePost.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Post created successfully",
        data: crePost.data
    }
    return res.status(HttpCodes.CREATED).json(response);
})