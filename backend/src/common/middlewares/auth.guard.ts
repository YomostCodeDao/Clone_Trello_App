import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export function authGuard(req: Request, res: Response, next: NextFunction) {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: { message: 'Unauthorized' } });
    }
    try {
        const token = header.slice(7);
        const payload = verifyAccessToken(token);
        (req as any).user = { id: payload.sub, email: payload.email };
        next();
    } catch {
        return res.status(401).json({ error: { message: 'Invalid token' } });
    }
}
