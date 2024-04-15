import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { createPost, getAllPosts, getMyPosts, getPostDetails, editPost, deletePost, completePost } from "../service/posts.service";
//import { FRONTEND_URL } from "../constants";
export const postsRouter = Router();

postsRouter.get("/all", async (req, res) => {
    const allPosts = await getAllPosts();

    if (allPosts.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving posts",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    // Filter out posts which are the users 
    // NOTE: here we can enforce type as not string 
    // because in the case of posts it will always be an array
    const authorEmail = req.session.email as string;
    if (typeof allPosts.data != "string") {
        const filteredPosts = allPosts?.data?.filter((post: any) => post.author.email !== authorEmail && post.status === "open");

        const response: CustomResponse = {
            error: false,
            message: "All posts retrieved successfully",
            data: filteredPosts
        }

        return res.status(HttpCodes.OK).json(response);
    } else {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(allPosts.data);
    }
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

postsRouter.post("/update", async (req, res) => {
    const id = req.body.requestId as string;
    const source = req.body.source as string;
    const destination = req.body.destination as string;
    const service = req.body.service as string;
    const costInPoints = parseInt(req.body.costInPoints) as number;
    const status = req.body.status as string;

    const authorEmail = req.session.email as string;

    const edPost = await editPost({
        id,
        authorEmail,
        source,
        destination,
        costInPoints,
        status,
        service
    });

    if (edPost.error) {
        const response: CustomResponse = {
            error: true,
            message: edPost.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Post updated successfully",
        data: edPost.data
    }
    return res.status(HttpCodes.OK).json(response);
})

postsRouter.post("/delete", async (req, res) => {
    const id = req.body.requestId as string;
    const service = req.body.service as string;
    const status = req.body.status as string;
    const source = req.body.source as string;
    const destination = req.body.destination as string;
    const costInPoints = parseInt(req.body.costInPoints) as number;

    const authorEmail = req.session.email as string;

    const delPost = await deletePost({
        id,
        authorEmail,
        status,
        service,
        source,
        destination,
        costInPoints
    });

    if (delPost.error) {
        const response: CustomResponse = {
            error: true,
            message: delPost.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const response: CustomResponse = {
        error: false,
        message: "Post Deleted Successfully",
        data: delPost.data
    }
    return res.status(HttpCodes.OK).json(response);
})

postsRouter.get("/get", async (req, res) => {
    const postId = req.query.postId as string;

    const postDetails = await getPostDetails(postId);

    if (postDetails.error) {
        const response: CustomResponse = {
            error: true,
            message: postDetails.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);

    }

    const response: CustomResponse = {
        error: false,
        message: "All details for the post retrieved successfully",
        data: postDetails.data
    }
    return res.status(HttpCodes.OK).json(response);
})

postsRouter.put("/complete/:postId", async (req, res) => {
    const postId = req.params.postId as string;
    const authorEmail = req.session.email as string;

    const markPostAsCompleted = await completePost(postId, authorEmail);
    if (markPostAsCompleted.error) {
        const response: CustomResponse = {
            error: true,
            message: markPostAsCompleted.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    else {
        const response: CustomResponse = {
            error: false,
            message: "Post marked as completed",
            data: markPostAsCompleted.data
        }
        return res.status(HttpCodes.OK).json(response);
    }
})