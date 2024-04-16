import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { getAllUsers, promoteUser, demoteUser, banUser } from "../service/admin.service";
import prisma from '../db'
import { getAllPosts } from "../service/posts.service";
export const adminRouter = Router();

adminRouter.get("/allusers", async (req, res) => {
    let currUserEmail = req.session.email;
    let currUser;
    try {
        currUser = await prisma.user.findUnique({
            where: {
                email: currUserEmail
            },
        });
    } catch (error) {
        console.log(error);
    }

    if (currUser?.role === "admin") {
        const appUsers = await getAllUsers();

        if (appUsers.error) {
            const response: CustomResponse = {
                error: true,
                message: "Error retrieving users",
                data: null
            }
            return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
        }

        if (typeof appUsers.data != "string") {
            // const normalUsers = appUsers?.data?.filter((u: any) => u.role !== 'admin');
            const response: CustomResponse = {
                error: false,
                message: "All users retrieved successfully",
                data: appUsers.data
            }

            return res.status(HttpCodes.OK).json(response);
        } else {
            return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(appUsers.data);
        }
    } else {
        return res.status(HttpCodes.UNAUTHORIZED);
    }
})

adminRouter.get("/allposts", async (_, res) => {
    const allPosts = await getAllPosts();

    if (allPosts.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving posts",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    // NOTE: here we can enforce type as not string 
    // because in the case of posts it will always be an array
    if (typeof allPosts.data != "string") {

        const response: CustomResponse = {
            error: false,
            message: "All posts retrieved successfully",
            data: allPosts.data
        }

        return res.status(HttpCodes.OK).json(response);
    } else {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(allPosts.data);
    }
})

adminRouter.put("/promote/:user", async (req, res) => {
    const userEmailId = req.params.user;
    const pro = await promoteUser(userEmailId);

    if (pro.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving users",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    } else {
        const response: CustomResponse = {
            error: false,
            message: "selected user is now an admin",
            data: pro
        }

        return res.status(HttpCodes.OK).json(response);
    }
})


adminRouter.put("/demote/:user", async (req, res) => {
    const userEmailId = req.params.user;
    const myEmail = req.session.email as string;
    const pro = await demoteUser(myEmail, userEmailId);

    if (pro.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving users",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    } else {
        const response: CustomResponse = {
            error: false,
            message: "selected user is demoted from admin role to user only role",
            data: pro
        }

        return res.status(HttpCodes.OK).json(response);
    }
})

adminRouter.put("/ban/:user", async (req, res) => {
    const userEmailId = req.params.user;
    const pro = await banUser(userEmailId);

    if (pro.error) {
        const response: CustomResponse = {
            error: true,
            message: pro.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    } else {
        const response: CustomResponse = {
            error: false,
            message: "Selected user's ban status has been updated",
            data: pro
        }

        return res.status(HttpCodes.OK).json(response);
    }
})