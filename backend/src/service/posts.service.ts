import { Post } from '@prisma/client'
import { CustomReturn } from '../types/CustomReturn'
import prisma from '../db'
import { logger } from '../utils/logger'


export const getAllPosts = async (): Promise<CustomReturn<Post[]>> => {
    try {
        let allPosts: Post[] = await prisma.post.findMany({
            include: {
                author: true
            }
        })
        return {
            error: false,
            data: allPosts
        }
    }
    catch (error) {
        return {
            error: true,
            data: null
        }
    }
}


export const getMyPosts = async (authorEmail: string): Promise<CustomReturn<Post[]>> => {
    try {
        let myPosts: Post[] = await prisma.post.findMany({
            where: {
                author: {
                    email: authorEmail
                }
            },
        })
        return {
            error: false,
            data: myPosts
        }
    } catch (error) {
        return {
            error: true,
            data: []
        }
    }
}

export const createPost = async (post: {
    authorEmail: string,
    source: string,
    destination: string
    costInPoints: number,
    service: string
}): Promise<CustomReturn<Post>> => {
    if (!post.authorEmail) return {
        error: true,
        data: "Author email is required."
    }

    try {
        let user = await prisma.user.findUnique({
            where: {
                email: post.authorEmail
            }
        });

        if (!user) return {
            error: true,
            data: "User does not exist."
        }

        if (user?.karmaPoints < post.costInPoints)
            return {
                error: true,
                data: "Karma points not enough to create a post."
            }

        let createPost = await prisma.post.create({
            data: {
                source: post.source,
                destination: post.destination,
                costInPoints: post.costInPoints,
                service: post.service,
                author: {
                    connect: {
                        email: user.email
                    }
                }
            },
        })

        return {
            error: false,
            data: createPost
        };
    } catch (err: any) {
        logger.error({
            location: "createPost",
            message: err.toString()
        });
        return {
            error: true,
            data: "Some error occurred while creating the post"
        }
    }
}