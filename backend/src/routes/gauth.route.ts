import { Router } from "express";
import { googleOAuthHandler } from "../service/gauth.service";

export const gauthRouter = Router();

gauthRouter.get("/", async (req, res) => {
    const appUser = await googleOAuthHandler(req);
    console.log({appUser});
    if (appUser.error) {
        console.log("new");
        res.redirect('http://localhost:3000/user/signup');
        return;
    } else {
        console.log("old");
        res.redirect('http://localhost:3000');
        return;
    }
});