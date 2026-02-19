import { IUser, IUserMethods, User } from '@/models/user.model.js';
import { AppError } from '@/util/appError.js';
import { asyncHandler } from '@/util/asyncHandler.js';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
interface DecodedToken extends jwt.JwtPayload {
  _id: string;
}
export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: HydratedDocument<IUser, IUserMethods>;
}

export const verify = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) throw new AppError(401, 'Unauthorized');

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as DecodedToken;
    const userData = await User.findById(decoded?._id).select('-refreshToken');

    if (!userData) throw new AppError(401, 'Invalid access token');

    req.user = userData;
    next();
  }
);
