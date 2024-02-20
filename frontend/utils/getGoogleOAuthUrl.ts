function getGoogleOAuthUrl(){
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI as string,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    };

    console.log({options})
    const qs = new URLSearchParams(options);
    console.log(qs.toString())
    return `${rootUrl}?${qs.toString()}`;

}

export default getGoogleOAuthUrl