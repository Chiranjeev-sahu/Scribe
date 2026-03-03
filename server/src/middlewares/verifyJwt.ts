import { IUser, IUserMethods, User } from '@/models/user.model.js';
import { DecodedToken } from '@/types/index.js';
import { AppError } from '@/util/appError.js';
import { asyncHandler } from '@/util/asyncHandler.js';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { AuthRequest } from '@/types/index.js';
export const verify = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) throw new AppError(401, 'Unauthorized');

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as DecodedToken;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError(401, 'Token expired');
      }
      throw new AppError(401, 'Invalid access token');
    }

    const userData = await User.findById(decoded?._id).select('-refreshToken');

    if (!userData) throw new AppError(401, 'User not found');

    req.user = userData;
    next();
  }
);
