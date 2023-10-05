import { auth } from 'express-oauth2-jwt-bearer';

const oAuth0CheckAuthentication = auth({
  audience: process.env.AUTH0_AUDIENCE_URL as string,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string
});

export default oAuth0CheckAuthentication;
