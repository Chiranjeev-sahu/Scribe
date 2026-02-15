import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import options from '@/config/corsOptions.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
import { postRouter } from './routes/post.routes.js';
import { userRouter } from './routes/user.routes.js';
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(options));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

app.use(errorHandler);

export { app };
