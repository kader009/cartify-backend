import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  decoded?: JwtPayload;
}

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.decoded && typeof req.decoded !== 'string') {
    const userRole = req.decoded.role;

    if (userRole !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'You do not have access to perform this action',
      });
    }

    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided or invalid token',
    });
  }
};
