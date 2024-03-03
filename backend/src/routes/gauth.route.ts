import { Router } from "express";
import { googleOAuthHandler } from "../service/gauth.service";
import { logger } from "../utils/logger";
import { FRONTEND_URL } from "../constants";

export const gauthRouter = Router();

gauthRouter.get("/", async (req, res) => {
    const appUser = await googleOAuthHandler(req);

    logger.info("Setting session data: " + req.session.email);

    if (appUser.error) {
        res.redirect(FRONTEND_URL);
        return;
    }

    if (appUser.data === "Create new user") {
        logger.info("Creating new user");
        res.redirect(FRONTEND_URL + '/user/create');
        return;
    } else {
        logger.info("User already exists");
        res.redirect(FRONTEND_URL);
        return;
    }
});