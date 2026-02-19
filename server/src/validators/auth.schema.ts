import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  username: z.string().min(3),
});
export type signupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
});
export type loginType = z.infer<typeof loginSchema>;
