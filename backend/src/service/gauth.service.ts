import { Request } from 'express'
import axios from "axios"
import qs from "qs"
import { User } from '@prisma/client'
import { google_client_id, google_client_secret, google_redirect_uri } from '../constants'
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'
import { GoogleTokensResult, GoogleUserResult } from '../types/GoogleOauth'
import { logger } from '../utils/logger'

export async function googleOAuthHandler(req: Request): Promise<CustomReturn<User>> {
    const code = req.query.code as string;

    try {
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });

        const googleUser = await getGoogleUser({ id_token, access_token });
        const userEmail = googleUser.email;

        req.session.email = userEmail;
        req.session.save();

        try {
            let appUser = await prisma.user.findUnique({
                where: {
                    email: userEmail
                },
            });

            if (!appUser) {
                return {
                    error: true,
                    data: appUser
                }
            }
            else
                return {
                    error: false,
                    data: appUser
                }
        } catch (error) {
            return {
                error: true,
                data: null
            }
        }
    } catch (e) {
        return {
            error: true,
            data: null
        }
    }
}

async function getGoogleOAuthTokens({
    code,
}: {
    code: string;
}): Promise<GoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        client_id: google_client_id,
        client_secret: google_client_secret,
        redirect_uri: google_redirect_uri,
        grant_type: "authorization_code",
    };

    try {
        const res = await axios.post<GoogleTokensResult>(
            url,
            qs.stringify(values),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return res.data;
    } catch (error: any) {
        logger.error(error.response.data.error);
        throw new Error(error.message);
    }
}

async function getGoogleUser({
    id_token,
    access_token
}: {
    id_token: string;
    access_token: string
}): Promise<GoogleUserResult> {
    try {
        const res = await axios.get<GoogleUserResult>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );
        return res.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
