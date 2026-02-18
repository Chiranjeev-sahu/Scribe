import { NextFunction, Request, Response } from 'express';

type AsyncController<T extends Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

export const asyncHandler = <T extends Request>(
  requestHandler: AsyncController<T>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req as T, res, next)).catch(next);
  };
};
