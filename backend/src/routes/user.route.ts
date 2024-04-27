import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { getUserById, newUser } from "../service/user.service";
import { updateUser } from "../service/user.service";
import { getUserByEmail } from "../service/user.service";
import { Post, User } from "@prisma/client";

export const userRouter = Router();

userRouter.post("/create", async (req, res) => {
    const data = req.body;
    const userEmail = req.session.email as string;

    data["email"] = userEmail;

    const createUser = await newUser(data);

    if (createUser.error) {
        const response: CustomResponse = {
            error: true,
            message: createUser.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const response: CustomResponse = {
        error: false,
        message: "User created successfully",
        data: createUser.data
    }

    return res.status(HttpCodes.CREATED).json(response);
});

userRouter.get("/get", async (req, res) => {
    try {
        const userEmail = req.session.email as string;
        const userDataResponse = await getUserByEmail(userEmail);

        if (userDataResponse.error) {
            throw new Error("Failed to fetch user data");
        }

        const userData = userDataResponse.data as User;

        const response: CustomResponse = {
            error: false,
            message: "User data fetched successfully",
            data: {
                id: userData.id,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                name: userData.name,
                karmaPoints: userData.karmaPoints,
                isPublic: userData.isPublic
            }
        };

        return res.status(HttpCodes.OK).json(response);
    } catch (error) {
        console.error("Error fetching user data:", error);

        const response: CustomResponse = {
            error: true,
            message: "Failed to fetch user data",
            data: null
        };

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
});

userRouter.get("/get/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const requestor = req.session.email as string;
        const userDataResponse = await getUserById(userId, requestor);

        if (userDataResponse.error) {
            return res.status(HttpCodes.NOT_FOUND).json({
                error: true,
                message: userDataResponse.data as string,
                data: null
            })
        }

        const userData = userDataResponse.data as (User & { posts: Post[] } & { requests: Request[] });

        const response: CustomResponse = {
            error: false,
            message: "User data fetched successfully",
            data: {
                name: userData.name,
                email: userData.email,
                karmaPoints: userData.karmaPoints,
                previousPosts: userData.posts,
                previousRequests: userData.requests,
            }
        };

        return res.status(HttpCodes.OK).json(response);
    } catch (error: any) {
        const response: CustomResponse = {
            error: true,
            message: "Failed to fetch user data",
            data: null
        };

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
})


userRouter.post("/update", async (req, res) => {
    try {
        const data = req.body;
        const email = req.session.email as string;

        data["email"] = email;
        const updateUserResponse = await updateUser(data);

        if (updateUserResponse.error) {
            const response: CustomResponse = {
                error: true,
                message: updateUserResponse.data as string,
                data: null
            }
            return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
        }

        const response: CustomResponse = {
            error: false,
            message: "User Updated successfully",
            data: updateUserResponse.data
        }

        return res.status(HttpCodes.OK).json(response);
    } catch (error) {
        console.error("Error updating user data:", error);

        const response = {
            error: true,
            message: "Failed to update user data",
            data: null
        };

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }
});

