import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';

const JWt_Secret = config.jwt_token as string;

interface AuthenticatedRequest extends Request {
  decoded?: JwtPayload | string;
}

const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req?.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Invalid token and Access Denied',
    });
    return;
  }

  jwt.verify(token, JWt_Secret, (error, decoded) => {
    if (error) {
      res.status(401).json({
        message: 'Invalid token and access denied',
      });
      return;
    }

    req.decoded = decoded as JwtPayload;
    next();
  });
};

export default verifyToken;
