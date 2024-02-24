import { Request } from 'express'
import axios from "axios"
import qs from "qs"
import { User } from '@prisma/client'
import config from "../../config/default"
import prisma from '../db'
import { CustomReturn } from '../types/CustomReturn'

export async function googleOAuthHandler(req: Request): Promise<CustomReturn<User>> {
    const code = req.query.code as string;

    try {
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });
        console.log({ id_token, access_token });

        const googleUser = await getGoogleUser({ id_token, access_token });

        console.log({ googleUser });

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

        // req.session.email = googleUser.verified_email;

        // if (!googleUser.verified_email) {
        // return res.json().toString();
        // }

        // return new Promise<string>((resolve) => {
        //     setTimeout(() => {
        //         resolve("Async string");
        //     }, 1000); // Simulating a delay of 1 second
        // });

    } catch (e) {
        return {
            error: true,
            data: null
        }
    }
}

interface GoogleTokensResult {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
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
        //   .error(error, "Failed to fetch Google Oauth Tokens");
        throw new Error(error.message);
    }
}

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
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
        // log.error(error, "Error fetching Google user");
        throw new Error(error.message);
    }
}

export const newUser = async (user: {
    name: string,
    email: string,
    phoneNumber: string,
}): Promise<CustomReturn<User>> => {
    try {
        let newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        })
        return {
            error: false,
            data: newUser
        };
    } catch (error) {
        return {
            error: true,
            data: null
        }
    }
}