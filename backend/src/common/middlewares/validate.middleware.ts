import type { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
        if (!result.success) {
            return res.status(400).json({ error: { message: 'Validation failed', issues: result.error.flatten() } });
        }
        next();
    };
