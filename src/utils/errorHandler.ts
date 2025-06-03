import { NextFunction, Request, Response } from 'express'; 

/** 
 * Error handling middleware.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
  });
  next();
};