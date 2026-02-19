import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/util/appError.js';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error occurred';
  let errors = err.errors || [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues;
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      stack: err.stack,
    });
  }

  const isOperational = err.isOperational || err instanceof ZodError;

  if (isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  console.error('PROGRAMMER ERROR ', err);
  return res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
};
