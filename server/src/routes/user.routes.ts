import { Router } from 'express';
import { verify } from '@/middlewares/verifyJwt.js';
import {
  toggleBookmark,
  getUserProfile,
  getMe,
  updateProfile,
} from '@/controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/profile/:username', getUserProfile);

userRouter.use(verify);
userRouter.get('/me', getMe).put('/me', updateProfile);
userRouter.post('/bookmarks/:id', toggleBookmark);

export { userRouter };
