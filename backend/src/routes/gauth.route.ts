import { Router } from "express";
import { googleOAuthHandler } from "../service/gauth.service";

export const gauthRouter = Router();

gauthRouter.get("/", async (req, res) => {
    const appUser = await googleOAuthHandler(req);

    if (appUser.error) {
        res.redirect('http://localhost:3000/user/signup');
        return;
    } else {
        res.redirect('http://localhost:3000');
        return;
    }
});