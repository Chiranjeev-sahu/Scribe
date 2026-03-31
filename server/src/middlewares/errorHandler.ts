import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/util/appError.js';
import { ZodError } from 'zod';

interface ExtendedError extends Error {
  statusCode?: number;
  errors?: unknown[];
  isOperational?: boolean;
}

export const errorHandler = (
  err: ExtendedError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = err.message || 'Token expired';
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      success: false,
      message,
      errors,
      stack: err.stack,
    });
    return;
  }

  const isOperational =
    err.isOperational ||
    err instanceof AppError ||
    err instanceof ZodError ||
    err.name === 'TokenExpiredError' ||
    err.name === 'JsonWebTokenError';

  if (isOperational) {
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
    return;
  }

  console.error('PROGRAMMER ERROR ', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
  return;
};
