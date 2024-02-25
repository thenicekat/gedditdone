import { Request } from 'express'
import axios from "axios"
import qs from "qs"
import { User } from '@prisma/client'
import config from "../../config/default"
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'
import { GoogleTokensResult, GoogleUserResult } from '../types/GoogleOauth'

export async function googleOAuthHandler(req: Request): Promise<CustomReturn<User>> {
    const code = req.query.code as string;

    try {
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });

        const googleUser = await getGoogleUser({ id_token, access_token });

        const userEmail = googleUser.email;
        req.session.email = userEmail;

        try {
            let appUser = await prisma.user.findUnique({
                where: {
                    email: userEmail
                },
            });
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
        client_id: config.google_client_id,
        client_secret: config.google_client_secret,
        redirect_uri: config.google_redirect_uri,
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
        console.error(error.response.data.error);
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
