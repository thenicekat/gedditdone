import { User } from '@prisma/client'
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'

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
            },
        })
        return {
            error: false,
            data: newUser
        };
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}

export const updatedUser = async (user: {
    name: string,
    email: string,
    phoneNumber: string,
}): Promise<CustomReturn<User>> => {
    if (!user.name) return {
        error: true,
        data: "User name is required to update profile."
    }

    if (!user.phoneNumber) return {
        error: true,
        data: "Phone Number is required to update profile."
    }

    if (!user.email) return {
        error: true,
        data: "Email is required to update profile."
    }

    try {
        let updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                name: user.name,
                phoneNumber: user.phoneNumber,
            },
        })
        return {
            error: false,
            data: updatedUser
        };
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}