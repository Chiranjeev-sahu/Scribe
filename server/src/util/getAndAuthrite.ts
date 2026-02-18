import { Post } from '@/models/post.model.js';
import { AppError } from './appError.js';
import { Types } from 'mongoose';

export const getAndAuthorizePost = async (
  postId: string,
  userId: Types.ObjectId | undefined
) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError(404, 'Post not found');
  if (post.author._id.toString() !== userId?.toString()) {
    throw new AppError(403, "You don't have permission to edit this post!");
  }
  return post;
};
