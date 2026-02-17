import { Schema, model, Types, Model, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser {
  username: string;
  email: string;
  password: string;
  bio?: string;
  bookmarks: Types.ObjectId[];
  refreshToken: string;
  avatar?: string;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    bookmarks: {
      type: [Types.ObjectId],
      ref: 'Post',
    },
    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (
  this: HydratedDocument<IUser, IUserMethods>,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (
  this: HydratedDocument<IUser, IUserMethods>
): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
    }
  );
};

userSchema.methods.generateRefreshToken = function (
  this: HydratedDocument<IUser, IUserMethods>
): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
    }
  );
};

export const User = model<IUser, UserModel>('User', userSchema);
