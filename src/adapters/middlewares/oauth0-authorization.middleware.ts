import { requiredScopes } from 'express-oauth2-jwt-bearer';

const oAuth0CheckAuthorization = requiredScopes('openid');

export default oAuth0CheckAuthorization;
