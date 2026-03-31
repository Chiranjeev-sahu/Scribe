import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser, IUserMethods } from '@/models/user.model.js';
import * as core from 'express-serve-static-core';

export type paramsType = { id: string };

export interface DecodedToken extends jwt.JwtPayload {
  _id: string;
}

export interface AuthRequest<
  P = core.ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = core.Query,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: HydratedDocument<IUser, IUserMethods>;
}
