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

export const promoteUser = async (userEmailId: string): Promise<CustomReturn<User>> => {
    try {
        const updatedUser = await prisma.user.update({
            where: { email: userEmailId },
            data: { role: 'admin' } // Assuming 'role' is the field representing user roles
        });

        return {
            error: false,
            data: updatedUser
        }
    } catch (err: any) {
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

export const demoteUser = async (myEmail: string, userEmailId: string): Promise<CustomReturn<User>> => {
    if (myEmail === userEmailId) return {
        error: true,
        data: "You cannot demote yourself."
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email: userEmailId },
            data: { role: 'user' } // Assuming 'role' is the field representing user roles
        });

        return {
            error: false,
            data: updatedUser
        }
    } catch (err: any) {
        logger.error(JSON.stringify({
            location: "demoteUser",
            message: err.toString()
        }));
        return {
            error: true,
            data: "Some error occurred while demoting admin to user role"
        }
    }
}

export const banUser = async (userEmailId: string): Promise<CustomReturn<User>> => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                email: userEmailId
            }
        });

        if (!user) return {
            error: true,
            data: "User does not exist."
        }

        if (user.role == "admin") {
            return {
                error: true,
                data: "An admin cannot be banned."
            }
        }

        if (user.role == "banned") {
            const unbannedUser = await prisma.user.update({
                where: { email: userEmailId },
                data: { role: 'user' }
            });
            return {
                error: false,
                data: unbannedUser
            }
        }
        else {
            const bannedUser = await prisma.user.update({
                where: { email: userEmailId },
                data: { role: 'banned' }
            });
            return {
                error: false,
                data: bannedUser
            }
        }
    }
    catch (err: any) {
        logger.error(JSON.stringify({
            location: "banUser",
            message: err.toString()
        }));
        return {
            error: true,
            data: "Some error occurred while banning user."
        }
    }
}

//changes Karma of a user
//use sign=false to decrease sign=true to increase
export const deltaKarma = async (userEmailId: string, amount: number, sign: boolean):
    Promise<CustomReturn<User>> => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                email: userEmailId
            }
        });

        if (!user) return {
            error: true,
            data: "User does not exist."
        }

        if (user.role == "admin") {
            return {
                error: true,
                data: "Admin karma cannot be updated."
            }
        }

        if (sign == false) {
            if (user.karmaPoints < amount) {
                return {
                    error: true,
                    data: "Stop, Stop! he is already dead."
                }
            }
            const punishedUser = await prisma.user.update({
                where: { email: userEmailId },
                data: {
                    karmaPoints: {
                        decrement: amount
                    }
                }
            })
            return {
                error: false,
                data: punishedUser
            }
        }
        else {
            const cherishedUser = await prisma.user.update({
                where: { email: userEmailId },
                data: {
                    karmaPoints: {
                        increment: amount
                    }
                }
            })
            return {
                error: false,
                data: cherishedUser
            }
        }
    }
    catch (err: any) {
        logger.error(JSON.stringify({
            location: "deltaKarma",
            message: err.toString()
        }));
        return {
            error: true,
            data: "Some error occurred while changing karma."
        }
    }
}