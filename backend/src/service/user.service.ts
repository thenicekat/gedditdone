import { User } from '@prisma/client'
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'
import { logger } from '../utils/logger'

export const newUser = async (user: {
    name: string,
    email: string,
    phoneNumber: string,
}): Promise<CustomReturn<User>> => {
    if (!user.name) return {
        error: true,
        data: "User name is required to create profile."
    }

    if (!user.phoneNumber) return {
        error: true,
        data: "Phone Number is required to create profile."
    }

    if (!user.email) return {
        error: true,
        data: "Email is required to create profile."
    }

    try {
        let newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                karmaPoints: 10
            },
        })
        return {
            error: false,
            data: newUser
        };
    } catch (error: any) {
        logger.error(JSON.stringify({
            location: "newUser",
            error: error.toString()
        }))
        return {
            error: true,
            data: null
        }
    }
}

export const updateUser = async (user: {
    name: string,
    email: string,
    phoneNumber: string,
}): Promise<CustomReturn<User>> => {
    if (!user.name || !user.phoneNumber) {
        return {
            error: true,
            data: "Name and Phone Number are required to update the profile."
        };
    }

    try {
        let userdetail = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (!userdetail) return {
            error: true,
            data: "User does not exist."
        }

        let updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                name: user.name,
                phoneNumber: user.phoneNumber,
            },
        });

        return {
            error: false,
            data: updatedUser
        };
    } catch (error) {
        return {
            error: true,
            data: null
        };
    }
};


export const getUserByEmail = async (email: string): Promise<CustomReturn<User>> => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) return {
            error: true,
            data: "User does not exist."
        }

        return {
            error: false,
            data: user
        }
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}

export const getUserById = async (id: string): Promise<CustomReturn<User>> => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                posts: true,
                requests: true,
            }
        });

        if (!user) return {
            error: true,
            data: "User does not exist."
        }

        if (!user.isPublic) return {
            error: true,
            data: "User is not public."
        }

        return {
            error: false,
            data: user
        }
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}