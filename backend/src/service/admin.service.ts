import { User } from '@prisma/client'
import { CustomReturn } from '../types/CustomReturn'
import prisma from '../db'
import { logger } from '../utils/logger'

export const getAllUsers = async (): Promise<CustomReturn<User[]>> => {
    try {
        let allUsers: User[] = await prisma.user.findMany();
        return {
            error: false,
            data: allUsers
        }
    }
    catch (error) {
        return {
            error: true,
            data: "Some error occurred while fetching the users"
        }
    }
}

export const promoteUser = async(userId: string): Promise<CustomReturn<User>> => {
    try{
        const updatedUser = await prisma.user.update({
        where: { email: userId },
        data: { role: 'admin' } // Assuming 'role' is the field representing user roles
        });

        return {
            error: false,
            data: updatedUser
        }
    } catch(err: any) {
        logger.error(JSON.stringify({
            location: "promoteUser",
            message: err.toString()
        }));
        return {
            error: true,
            data: "Some error occurred while promoting user to admin role"
        }
    }
}