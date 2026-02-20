import { login, logout, signup } from '@/controllers/auth.controllers.js';
import { validate } from '@/middlewares/validate.js';
import { verify } from '@/middlewares/verifyJwt.js';
import { loginSchema, signupSchema } from '@/validators/auth.schema.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.route('/signup').post(validate(signupSchema), signup);
authRouter.route('/login').post(validate(loginSchema), login);

authRouter.route('/logout').post(verify, logout);

export { authRouter };
