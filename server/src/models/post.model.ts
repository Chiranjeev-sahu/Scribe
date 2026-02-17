import { Schema, model, Types, Model } from 'mongoose';

type Category = 'Technology' | 'People' | 'Culture' | 'Lifestyle';
type PostStatus = 'draft' | 'published';

interface IPost {
  title: string;
  summary?: string;
  content: Record<string, unknown>;
  coverImage?: string;
  author: Types.ObjectId;
  category: Category;
  status: PostStatus;
}
const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    summary: {
      type: String,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },

    coverImage: { type: String },

    author: {
      type: Types.ObjectId,
      ref: 'User',
    },

    category: {
      type: String,
      enum: ['Technology', 'People', 'Culture', 'Lifestyle'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>('Post', postSchema);
