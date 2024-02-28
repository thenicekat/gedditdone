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
        logger.error({
            location: "newUser",
            error: error.toString()
        })
        return {
            error: true,
            data: null
        }
    }
}