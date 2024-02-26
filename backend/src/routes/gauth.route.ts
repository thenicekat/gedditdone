import { Router } from "express";
import { googleOAuthHandler } from "../service/gauth.service";
import { logger } from "../utils/logger";

export const gauthRouter = Router();

gauthRouter.get("/", async (req, res) => {
    const appUser = await googleOAuthHandler(req);

    if (appUser.error) {
        logger.info("Creating new user");
        res.redirect('http://localhost:3000/user/signup');
        return;
    } else {
        logger.info("User already exists");
        res.redirect('http://localhost:3000');
        return;
    }
});