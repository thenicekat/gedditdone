import { Post, Request } from "@prisma/client"
import prisma from "../db"
import { CustomReturn } from "../types/CustomReturn"
import { logger } from "../utils/logger"

export const getMyRequests = async (email: string): Promise<CustomReturn<Request[]>> => {
    if (!email) return {
        error: true,
        data: []
    }
    try {
        let requests: Request[] = await prisma.request.findMany({
            where: {
                senderEmail: email
            },
            include: {
                post: true
            }
        })
        return {
            error: false,
            data: requests
        }
    } catch (error: any) {
        logger.error(JSON.stringify({
            location: "getMyRequests",
            error: error.toString()
        }))
        return {
            error: true,
            data: []
        }
    }
}

export const createRequest = async (postId: string, emailId: string): Promise<CustomReturn<Request>> => {
    try {
        let checkRequest: Request | null = await prisma.request.findFirst({
            where: {
                postId: postId,
                senderEmail: emailId
            }
        })
        if (checkRequest) {
            return {
                error: true,
                data: "You have already sent a request for this post."
            }
        }

        let checkPostExistence: Post | null = await prisma.post.findFirst({
            where: {
                id: postId,
            }
        })
        if (!checkPostExistence) {
            return {
                error: true,
                data: "Post does not exist."
            }
        }
        if (checkPostExistence.status != "open") {
            return {
                error: true,
                data: "This post is not open"
            }
        }

        let checkUserExistence = await prisma.user.findFirst({
            where: {
                email: emailId
            }
        })
        if (!checkUserExistence) {
            return {
                error: true,
                data: "User does not exist."
            }
        }

        if (checkUserExistence.id === checkPostExistence.authorId) {
            return {
                error: true,
                data: "You cannot on request your own post."
            }
        }

        let request: Request = await prisma.request.create({
            data: {
                sender: {
                    connect: {
                        email: emailId
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                }
            }
        })
        return {
            error: false,
            data: request
        }
    } catch (error) {
        return {
            error: true,
            data: "An error occurred while creating the request. Please try again later."
        }
    }
}

export const acceptRequest = async (requestId: string): Promise<CustomReturn<Request>> => {
    try {
        let request: Request | null = await prisma.request.findFirst({
            where: {
                id: requestId
            }
        })
        if (!request) {
            return {
                error: true,
                data: "Request does not exist."
            }
        }

        let post: Post | null = await prisma.post.findFirst({
            where: {
                id: request.postId
            }
        })
        if (!post) {
            return {
                error: true,
                data: "Post does not exist."
            }
        }

        if (post.status === "closed") {
            return {
                error: true,
                data: "Post is already closed."
            }
        }
        await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                status: "closed"
            }
        })

        let updatedRequest = await prisma.request.update({
            where: {
                id: request.id
            },
            data: {
                status: "accepted"
            },
            select: {
                id: true,
                status: true,
                post: true,
                postId: true,
                sender: true,
                senderEmail: true,
            }
        })
        return {
            error: false,
            data: updatedRequest
        }
    } catch (error) {
        return {
            error: true,
            data: "An error occurred while accepting the request. Please try again later."
        }
    }
}