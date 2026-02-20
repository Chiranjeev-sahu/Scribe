import { AuthRequest } from '@/middlewares/verifyJwt.js';
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

    return res
      .status(200)
      .json(
        new APIResponse(
          200,
          { user: userProfile, posts: publishedPosts },
          'Profile fetched'
        )
      );
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

    return res
      .status(200)
      .json(
        new APIResponse(
          200,
          updatedUser?.bookmarks,
          isBookmarked ? 'Bookmark removed' : 'Bookmark added'
        )
      );
  }
);

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  return res.status(200).json(new APIResponse(200, req.user));
});

export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { avatar, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { bio, avatar },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) throw new AppError(404, 'User not found');

    return res
      .status(200)
      .json(new APIResponse(200, updatedUser, 'Profile updated'));
  }
);
