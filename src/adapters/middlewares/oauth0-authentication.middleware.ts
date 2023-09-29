import { auth } from 'express-oauth2-jwt-bearer';

const oAuth0CheckAuthentication = auth({
  audience: 'https://api.financeapp.dev',
  issuerBaseURL: `https://dev--sdch3u7.us.auth0.com/`,
});

export default oAuth0CheckAuthentication;
