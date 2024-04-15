import { Router } from "express";
import { CustomResponse } from "../types/CustomResponse";
import { acceptRequest, createRequest, getMyRequests, completeRequest } from "../service/requests.service";
import { HttpCodes } from "../types/HttpCodes";

export const requestsRouter = Router()

requestsRouter.get("/my", async (req, res) => {
    const authorEmail = req.session.email as string;

    const myRequests = await getMyRequests(authorEmail);

    if (myRequests.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving your requests",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Your requests retrieved successfully",
        data: myRequests.data
    }
    return res.status(HttpCodes.OK).json(response);
})

requestsRouter.post("/create", async (req, res) => {
    const postId = req.body.postId as string;
    const authorEmail = req.session.email as string;

    const creRequest = await createRequest(postId, authorEmail);

    if (creRequest.error) {
        const response: CustomResponse = {
            error: true,
            message: creRequest.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Request created successfully",
        data: creRequest.data
    }
    return res.status(HttpCodes.CREATED).json(response);
})

requestsRouter.post("/accept", async (req, res) => {
    const requestId = req.body.requestId as string;

    const acceptReq = await acceptRequest(requestId);

    if (acceptReq.error) {
        const response: CustomResponse = {
            error: true,
            message: acceptReq.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    } else {
        const response: CustomResponse = {
            error: false,
            message: "Request accepted successfully",
            data: acceptReq.data
        }
        return res.status(HttpCodes.OK).json(response);
    }
})

requestsRouter.post("/complete", async (req, res) => {
    const requestId = req.body.requestId as string;

    const completeReq = await completeRequest(requestId);

    if (completeReq.error) {
        const response: CustomResponse = {
            error: true,
            message: completeReq.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    } else {
        const response: CustomResponse = {
            error: false,
            message: "Request completed successfully",
            data: completeReq.data
        }
        return res.status(HttpCodes.OK).json(response);
    }
})