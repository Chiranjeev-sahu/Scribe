import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '@/config/cookieOptions.js';
import { AuthRequest, DecodedToken } from '@/types/index.js';
import { User } from '@/models/user.model.js';
import { APIResponse } from '@/util/apiResponse.js';
import { AppError } from '@/util/appError.js';
import { asyncHandler } from '@/util/asyncHandler.js';
import { sendAuthResponsewithTokens } from '@/util/auth.utils.js';
import { loginType, signupType } from '@/validators/auth.schema.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const signup = asyncHandler(
  async (req: Request<object, unknown, signupType>, res: Response) => {
    const { email, username, password } = req.body;

    const exists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exists)
      throw new AppError(409, 'User with email or username already exists');

    const createdUser = await User.create({ username, email, password });

    if (!createdUser)
      throw new AppError(500, 'Something wrong while creating user');

    const userResponse = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      avatar: createdUser.avatar,
      bio: createdUser.bio,
    };

    await sendAuthResponsewithTokens(
      res,
      userResponse,
      201,
      'User registered successfully'
    );
    return;
  }
);

export const login = asyncHandler(
  async (req: Request<object, unknown, loginType>, res: Response) => {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).select('+password');

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    };

    await sendAuthResponsewithTokens(
      res,
      userResponse,
      200,
      'User logged in successfully'
    );
    return;
  }
);

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  res
    .status(200)
    .clearCookie('accessToken', accessTokenCookieOptions)
    .clearCookie('refreshToken', refreshTokenCookieOptions)
    .json(new APIResponse(200, {}, 'User logged out successfully'));
  return;
});

export const refreshAccessToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new AppError(401, 'Unauthorized');
    }

    const verified = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as DecodedToken;

    const user = await User.findById(verified._id).select('+refreshToken');

    if (!user) {
      throw new AppError(401, 'Invalid refresh token');
    }

    if (user.refreshToken !== refreshToken) {
      throw new AppError(401, 'Refresh token is expired or used');
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    };

    await sendAuthResponsewithTokens(
      res,
      userResponse,
      200,
      'Access token refreshed successfully'
    );
    return;
  }
);
