import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { newUser } from "../service/user.service";
import { updateUser } from "../service/user.service";
import { getUserByEmail } from "../service/user.service";

export const userRouter = Router();

userRouter.post("/create", async (req, res) => {
    const data = req.body;
    const userEmail = req.session.email as string;

    data["email"] = userEmail;

    const createUser = await newUser(data);

    if (createUser.error) {
        const response: CustomResponse = {
            error: true,
            message: "There was an error creating your profile",
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

        const userData = userDataResponse.data;

        const response: CustomResponse = {
            error: false,
            message: "User data fetched successfully",
            data: {
                email: userEmail,
                user: userData
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


userRouter.post("/update", async (req, res) => {
    try {
        const data = req.body;
        const userEmail = req.session.email as string;

        if (userEmail !== data.email) {
            throw new Error("Email mismatch between session and request data.");
        }

        const updateUserResponse = await updateUser(data);

        if (updateUserResponse.error) {
            throw new Error("Failed to update user data");
        }

        const response = {
            error: false,
            message: "User data updated successfully",
            data: updateUserResponse.data
        };

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

