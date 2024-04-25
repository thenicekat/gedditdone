import { Report, Post } from '@prisma/client'
import { CustomReturn } from '../types/CustomReturn'
import prisma from '../db'
import { logger } from '../utils/logger'

export const getAllReports = async (): Promise<CustomReturn<Report[]>> => {
    try {
        let allReports: Report[] = await prisma.report.findMany()
        return {
            error: false,
            data: allReports
        }
    }
    catch (error) {
        return {
            error: true,
            data: "Some error occurred while fetching the reports."
        }
    }
}

export const createReport = async (reason: string, emailId: string, postId: string): Promise<CustomReturn<Report>> => {
    if (!emailId) return {
        error: true,
        data: "Author email is required."
    }

    let checkPostExistence: Post | null = await prisma.post.findUnique({
        where: {
            id: postId,
        }
    })
    if (!checkPostExistence) {
        return {
            error: true,
            data: "Post does not exist."
        }
    } else {
        if (checkPostExistence.status === "completed") {
            return {
                error: true,
                data: "A Report cannot be made against a completed post."
            }
        }
    }

    if (!reason) return {
        error: true,
        data: "Reason is required."
    }

    let checkReportExistence: Report | null = await prisma.report.findFirst({
        where: {
            postId: postId
        }
    })

    if (checkReportExistence) {
        return {
            error: true,
            data: "A report already exists on this post."
        }
    }
    try {
        let createReport = await prisma.report.create({
            data: {
                reason: reason,
                reporter: {
                    connect: {
                        email: emailId
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                },
            },
        })

        return {
            error: false,
            data: createReport
        };
    } catch (err: any) {
        logger.error(JSON.stringify({
            location: "createReport",
            message: err.toString()
        }));
        return {
            error: true,
            data: "Some error occurred while creating the report."
        }
    }
};

export const closeReport = async (reportId: string): Promise<CustomReturn<Report>> => {
    try {
        const updatedReport = await prisma.report.update({
            where: { id: reportId },
            data: { status: "closed" }
        });

        return {
            error: false,
            data: updatedReport
        };
    } catch (error) {
        return {
            error: true,
            data: "Some error occurred while closing the report"
        };
    }
};