import { Post, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPosts = async () => {
    try {
        let allPosts: Post[] = await prisma.post.findMany()
        return {
            error: false,
            data: allPosts
        }
    }
    catch (error) {
        return {
            error: true,
            data: error
        }
    }
}

export const getMyPosts = async (userId: string) => {
    try {
        let myPosts: Post[] = await prisma.post.findMany({
            where: {
                authorId: userId
            }
        })
        return {
            error: false,
            data: myPosts
        }
    } catch (error) {
        return {
            error: true,
            data: error
        }
    }
}

export const createPost = async (data: {
    source: string,
    destination: string
    authorId: string,
    costInPoints: number,
    service: string
}) => {
    try {
        let createPost = await prisma.post.create({
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
    } catch (error) {
        return {
            error: true,
            data: error
        }
    }
}