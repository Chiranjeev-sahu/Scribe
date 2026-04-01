import { AuthRequest } from '@/types/index.js';
import { Post } from '@/models/post.model.js';
import { User } from '@/models/user.model.js';
import { APIResponse } from '@/util/apiResponse.js';
import { AppError } from '@/util/appError.js';
import { asyncHandler } from '@/util/asyncHandler.js';
import { getAndAuthorizePost } from '@/util/getAndAuthrize.js';
import { updatePostSchema } from '@/validators/post.schema.js';
import { Response, Request } from 'express';
import { paramsType } from '@/types/index.js';

export const createDraft = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const authorId = req.user?._id;
    if (!authorId) throw new AppError(401, 'Unauthorized Request');

    const newDoc = await Post.create({
      title: 'Untitled',
      content: { type: 'doc', content: [{ type: 'paragraph' }] },
      status: 'draft',
      author: authorId,
      category: 'Technology',
    });

    if (!newDoc) throw new AppError(500, 'Failed to create a new ');

    res
      .status(201)
      .json(
        new APIResponse(201, { _id: newDoc._id }, 'Draft created successfully')
      );
    return;
  }
);

const opts = { runValidators: true, new: true };

export const updateDraft = asyncHandler(
  async (
    req: AuthRequest<paramsType, unknown, updatePostSchema>,
    res: Response
  ) => {
    const post = await getAndAuthorizePost(req.params.id, req.user?._id);
    const updatedPost = await Post.findByIdAndUpdate(post._id, req.body, opts);

    if (!updatedPost) throw new AppError(500, 'Failed to update draft');

    res.status(200).json(new APIResponse(200, updatedPost, 'Draft saved'));
    return;
  }
);

export const getDraft = asyncHandler(
  async (req: AuthRequest<paramsType>, res: Response) => {
    const post = await getAndAuthorizePost(req.params.id, req.user?._id);
    res
      .status(200)
      .json(new APIResponse(200, post, 'Fetched post successfully'));
    return;
  }
);

export const publishPost = asyncHandler(
  async (
    req: AuthRequest<paramsType, unknown, updatePostSchema>,
    res: Response
  ) => {
    const post = await getAndAuthorizePost(req.params.id, req.user?._id);

    const finalTitle = req.body.title || post.title;
    const finalCategory = req.body.category || post.category;
    const finalContent = req.body.content || post.content;

    if (!finalTitle.trim() || !finalCategory.trim()) {
      throw new AppError(406, 'Title and category cannot be empty');
    }
    if (!finalContent || Object.keys(finalContent).length === 0) {
      throw new AppError(406, 'Content cannot be empty');
    }

    const publishedPost = await Post.findByIdAndUpdate(
      post._id,
      { ...req.body, status: 'published' },
      opts
    );

    if (!publishedPost) throw new AppError(500, 'Could not publish post');

    res
      .status(200)
      .json(
        new APIResponse(200, publishedPost, 'Post published successfully!')
      );
    return;
  }
);

export const deletePost = asyncHandler(
  async (req: AuthRequest<paramsType>, res: Response) => {
    const post = await getAndAuthorizePost(req.params.id, req.user?._id);

    const deleted = await Post.findByIdAndDelete(post._id);
    if (!deleted) throw new AppError(500, 'Failed to delete');

    res.status(200).json(new APIResponse(200, deleted, 'Deletion successful'));
    return;
  }
);

export const getDraftsList = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const posts = await Post.find({
      author: req.user?._id,
      status: 'draft',
    }).select('title coverImage summary category updatedAt author');

    res
      .status(200)
      .json(new APIResponse(200, posts, 'Successfully fetched drafts'));
    return;
  }
);

export const getBookmarksList = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId).populate(
      'bookmarks',
      'title coverImage summary category author updatedAt'
    );

    if (!user) throw new AppError(404, 'User not found');

    res
      .status(200)
      .json(
        new APIResponse(200, user.bookmarks, 'Successfully fetched bookmarks')
      );
    return;
  }
);

//public
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findOne({
    _id: req.params.id,
    status: 'published',
  }).populate('author', 'username avatar bio');

  if (!post) throw new AppError(404, 'Post not found or is still a draft');

  res.status(200).json(new APIResponse(200, post, 'Fetched post successfully'));
  return;
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const category = req.query.category as string;

  const offset = (page - 1) * limit;

  const query: { status: string; category?: string } = { status: 'published' };
  if (category) {
    query.category = category;
  }

  const posts = await Post.find(query)
    .select('title coverImage summary category updatedAt author')
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .exec();

  const totalPosts = await Post.countDocuments(query);

  res.status(200).json(
    new APIResponse(
      200,
      {
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalPosts / limit),
          totalPosts,
        },
      },
      'Successfully fetched posts'
    )
  );
  return;
});
