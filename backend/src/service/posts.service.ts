import { Post } from '@prisma/client'
import { CustomReturn } from '../types/CustomReturn'
import prisma from '../db'


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

export const createPost = async (data: {
    authorEmail: string,
    source: string,
    destination: string
    costInPoints: number,
    service: string
}): Promise<CustomReturn<Post>> => {
    try {
        let createPost = await prisma.post.create({
            data: {
                source: data.source,
                destination: data.destination,
                costInPoints: data.costInPoints,
                service: data.service,
                author: {
                    connect: {
                        email: data.authorEmail
                    }
                }
            },

        })
        return {
            error: false,
            data: createPost
        };
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}