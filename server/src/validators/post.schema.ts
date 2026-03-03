import { z } from 'zod';

const basePostSchema = z.object({
  title: z.string(),
  content: z.any(),
  coverImage: z.string().nullable().optional().or(z.literal('')),
  category: z.enum([
    'Technology',
    'People',
    'Culture',
    'Lifestyle',
    'technology',
    'people',
    'culture',
    'lifestyle',
  ]),
});

export const updatePost = basePostSchema.partial();
export type updatePostSchema = z.infer<typeof updatePost>;
