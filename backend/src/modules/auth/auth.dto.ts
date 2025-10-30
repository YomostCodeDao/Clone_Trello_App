import { z } from 'zod';

export const RegisterDto = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(64),
        name: z.string().min(1).max(100).optional(),
    }),
});

export const LoginDto = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(64),
    }),
});
