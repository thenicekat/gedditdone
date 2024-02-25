import { Router } from "express";
import { googleOAuthHandler } from "../service/gauth.service";

export const gauthRouter = Router();

gauthRouter.get("/", async (req, res) => {
    const appUser = await googleOAuthHandler(req);

    if (appUser.error) {
        res.redirect('localhost:3000/user/signup');
    }

    res.redirect('localhost:3000');
});