import { User } from '@/models/user.model.js';
import { AppError } from './appError.js';
import { Response } from 'express';
import { cookieOptions } from '@/config/cookieOptions.js';
import { APIResponse } from './apiResponse.js';

const createAccAndRefTokens = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user does not exist');
  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const sendAuthResponsewithTokens = async (
  res: Response,
  userData: { _id: any; [key: string]: any },
  statuscode: number,
  message: string
) => {
  const { accessToken, refreshToken } = await createAccAndRefTokens(
    userData._id
  );

  return res
    .status(statuscode)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new APIResponse(
        statuscode,
        {
          user: userData,
          accessToken,
          refreshToken,
        },
        message
      )
    );
};
