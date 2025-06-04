import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse, TErrorSources } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    const path = issue?.path?.join('.') || 'unknown';
    return {
      path,
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error', 
    errorSources,
  };
};

export default handleZodError;
