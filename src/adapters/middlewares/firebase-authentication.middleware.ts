import {Response, Request, NextFunction} from "express";
import admin from "../../../config/firebase.config";

export interface AuthenticatedRequest extends Request {
  authToken: string;
  email: string;
}

const getAuthToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = '';
  }
  next();
};

const firebaseAuthentication = (req: AuthenticatedRequest | Request, res: Response, next: NextFunction) => {
  const request = req as AuthenticatedRequest;
  getAuthToken(request, res, async () => {
    try {
      const {authToken} = request;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      request.email = userInfo.email as string;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({error: 'You are not authorized to make this request'});
    }
  });
};

export default firebaseAuthentication;
