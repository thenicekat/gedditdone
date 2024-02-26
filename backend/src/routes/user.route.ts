import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { newUser } from "../service/user.service";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
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

