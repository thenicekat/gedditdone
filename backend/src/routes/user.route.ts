import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { newUser } from "../service/user.service";
// import session, { SessionData } from "express-session";
export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const data = req.body;
    // const userEmail = session.email as string;
    // console.log(userEmail)
    console.log(data)
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
    res.redirect('/');
    return res.status(HttpCodes.CREATED).json(response);
});

