import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { newUser } from "../service/user.service";

export const userRouter = Router();

userRouter.post("/user/signup", async (req, res) => {
    const data = req.body;
    const userEmail = req.session.email;

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
        message: "user created successfully",
        data: createUser.data
    }
    res.redirect('/');
    return res.status(HttpCodes.CREATED).json(response);
});

