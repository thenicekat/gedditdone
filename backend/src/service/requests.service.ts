import { Post, Request } from "@prisma/client"
import prisma from "../db"
import { CustomReturn } from "../types/CustomReturn"

export const getRequestsForPost = async (postId: string): Promise<CustomReturn<Request[]>> => {
    if (!postId) return {
        error: true,
        data: []
    }

    try {
        let requests: Request[] = await prisma.request.findMany({
            where: {
                id: postId
            },
            include: {
                sender: true
            }
        })
        return {
            error: false,
            data: requests
        }
    } catch (error) {
        return {
            error: true,
            data: []
        }
    }
}

export const getMyRequests = async (email: string): Promise<CustomReturn<Request[]>> => {
    if (!email) return {
        error: true,
        data: []
    }
    try {
        let requests: Request[] = await prisma.request.findMany({
            where: {
                senderEmail: email
            }
        })
        return {
            error: false,
            data: requests
        }
    } catch (error) {
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