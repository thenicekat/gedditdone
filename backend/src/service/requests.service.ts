import { Request } from "@prisma/client"
import prisma from "../db"
import { CustomReturn } from "../types/CustomReturn"

export const getRequestsForPost = async (postId: string): Promise<CustomReturn<Request[]>> => {
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
            data: null
        }
    }
}