import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import { TErrorSources } from '../../interface/error';

interface MongooseValidationError extends Error {
  errors?: Record<string, { path: string; message: string }>;
}

interface MongooseCastError extends Error {
  path?: string;
  value?: string;
}

interface CustomError extends Partial<MongooseValidationError>, Partial<MongooseCastError> {
  statusCode?: number;
}

const globalErrorHandler: ErrorRequestHandler = (err: CustomError, req, res) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSources = [];

  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = 'Validation Error';
    errorSources = Object.values(err.errors).map((el) => ({
      path: el.path || '',
      message: el.message || 'Invalid input',
    }));
  } else if (err.name === 'CastError' && err.path && err.value) {
    statusCode = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
    errorSources = [
      {
        path: err.path,
        message: `Invalid value: ${err.value}`,
      },
    ];
  } else {
    errorSources = [
      {
        path: '',
        message: message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
