import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    password: z.string({ required_error: 'Password is required' }).max(30),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Must be a valid email address' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Must be a valid email address' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token is required' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
