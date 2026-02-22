import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser, IUserMethods } from '@/models/user.model.js';

export type paramsType = { id: string };

export interface DecodedToken extends jwt.JwtPayload {
  _id: string;
}

export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: HydratedDocument<IUser, IUserMethods>;
}
