import { requiredScopes } from 'express-oauth2-jwt-bearer';

const oAuth0CheckAuthorization = requiredScopes('email');

export default oAuth0CheckAuthorization;
