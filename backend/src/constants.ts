export const PORT: number = 5000;
export const __prod__ = process.env.NODE_ENV as string === "production";
export const __test__ = process.env.NODE_ENV as string === "test";
export const SESSIONKEY: string = process.env.SESSIONKEY as string;
export const google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const google_redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI;