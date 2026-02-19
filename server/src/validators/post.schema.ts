import { z } from 'zod';

const basePostSchema = z.object({
  title: z.string(),
  content: z.any(),
  coverimage: z.string(),
  category: z.enum(['Technology', 'People', 'Culture', 'Lifestyle']),
});

export const updatePost = basePostSchema.partial();
export type updatePostSchema = z.infer<typeof updatePost>;
