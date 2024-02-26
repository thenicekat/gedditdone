export const PORT: number = 5000;
export const __prod__ = parseInt(process.env.PRODUCTION as string) === 1;
export const __test__ = parseInt(process.env.TESTING as string) === 1;
export const SESSIONKEY: string = process.env.SESSIONKEY as string;
export const google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const google_redirect_uri= process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI;
export const google_client_secret= process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET;