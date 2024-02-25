import { User } from '@prisma/client'
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'
export const newUser = async (user: {
    name: string,
    email: string,
    phoneNumber: string,
}): Promise<CustomReturn<User>> => {
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