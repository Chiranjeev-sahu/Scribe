import { Router } from 'express';

import {
  createDraft,
  updateDraft,
  publishPost,
  getDraft,
  getPosts,
  getPostById,
  deletePost,
  getDraftsList,
  getBookmarksList,
} from '@/controllers/post.controllers.js';
import { verify } from '@/middlewares/verifyJwt.js';
import { validate } from '@/middlewares/validate.js';
import { updatePost } from '@/validators/post.schema.js';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/public/:id', getPostById);

postRouter.use(verify);
postRouter.post('/', createDraft);

postRouter
  .route('/:id')
  .get(getDraft)
  .patch(validate(updatePost), updateDraft)
  .delete(deletePost);

postRouter.patch('/:id/publish', validate(updatePost), publishPost);

// Shared user-post routes
postRouter.get('/user/drafts', getDraftsList);
postRouter.get('/user/bookmarks', getBookmarksList);

export { postRouter };
