import type { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { env } from '../../config/env';

const REFRESH_COOKIE_NAME = 'refresh_token';

export class AuthController {
    private svc = new AuthService();

    private setRefreshCookie(res: Response, token: string) {
        res.cookie(REFRESH_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.COOKIE_SECURE,
            path: '/api/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d (tuỳ env)
        });
    }

    private clearRefreshCookie(res: Response) {
        res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth/refresh' });
    }

    // dùng arrow để không cần .bind
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, name } = req.body;
            const { accessToken, refreshToken, user } = await this.svc.register(email, password, name);
            this.setRefreshCookie(res, refreshToken);
            res.status(201).json({ accessToken, user });
        } catch (err) { next(err); }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken, user } = await this.svc.login(email, password);
            this.setRefreshCookie(res, refreshToken);
            res.json({ accessToken, user });
        } catch (err) { next(err); }
    };

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const oldToken = req.cookies?.[REFRESH_COOKIE_NAME] ?? '';
            const { accessToken, refreshToken, user } = await this.svc.refresh(oldToken);
            this.setRefreshCookie(res, refreshToken);
            res.json({ accessToken, user });
        } catch (err) { next(err); }
    };

    logout = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            if (req.user?.id) await this.svc.logout(req.user.id);
            this.clearRefreshCookie(res);
            res.sendStatus(204);
        } catch (err) { next(err); }
    };

    me = async (req: Request & { user?: any }, res: Response) => {
        const u = req.user!;
        res.json({ user: { id: u.id, email: u.email, name: u.name } });
        // nếu guard đã nhét user vào req
    };
}
