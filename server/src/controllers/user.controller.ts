import { AuthRequest } from '@/types/index.js';
import { Post } from '@/models/post.model.js';
import { APIResponse } from '@/util/apiResponse.js';
import { asyncHandler } from '@/util/asyncHandler.js';
import { Request, Response } from 'express';
import { paramsType } from '@/types/index.js';
import { AppError } from '@/util/appError.js';
import { User } from '@/models/user.model.js';

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;

    const userProfile = await User.findOne({ username }).select(
      '-refreshToken -bookmarks'
    );

    if (!userProfile) throw new AppError(404, 'User not found');

    const publishedPosts = await Post.find({
      author: userProfile._id,
      status: 'published',
    });

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          { user: userProfile, posts: publishedPosts },
          'Profile fetched'
        )
      );
    return;
  }
);

export const toggleBookmark = asyncHandler(
  async (req: AuthRequest<paramsType>, res: Response) => {
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) throw new AppError(401, 'Unauthorized');

    const post = await Post.findById(postId);
    if (!post) throw new AppError(404, 'Post not found');

    const isBookmarked = req.user?.bookmarks.includes(post._id);

    let updatedUser;
    if (isBookmarked) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { bookmarks: post._id } },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { bookmarks: post._id } },
        { new: true }
      );
    }

    res
      .status(200)
      .json(
        new APIResponse(
          200,
          updatedUser?.bookmarks,
          isBookmarked ? 'Bookmark removed' : 'Bookmark added'
        )
      );
    return;
  }
);

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.status(200).json(new APIResponse(200, req.user));
  return;
});

type UpdateProfileBody = {
  bio?: string;
  avatar?: string;
};

export const updateProfile = asyncHandler(
  async (req: AuthRequest<object, unknown, UpdateProfileBody>, res: Response) => {
    const updateData: Record<string, unknown> = {};

    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.avatar !== undefined) updateData.avatar = req.body.avatar;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) throw new AppError(404, 'User not found');

    res.status(200).json(new APIResponse(200, updatedUser, 'Profile updated'));
    return;
  }
);
