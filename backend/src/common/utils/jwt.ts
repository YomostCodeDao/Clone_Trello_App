// src/common/utils/jwt.ts
import * as jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export type JwtUser = { sub: string; email: string };

export function signAccessToken(payload: JwtUser) {
    const opts: jwt.SignOptions = {};
    if (env.JWT_ACCESS_EXPIRES) {
        // đảm bảo kiểu đúng và không có undefined
        opts.expiresIn = env.JWT_ACCESS_EXPIRES as jwt.SignOptions['expiresIn'];
    }
    return jwt.sign(payload, env.JWT_ACCESS_SECRET as jwt.Secret, opts);
}

export function signRefreshToken(payload: JwtUser) {
    const opts: jwt.SignOptions = {};
    if (env.JWT_REFRESH_EXPIRES) {
        opts.expiresIn = env.JWT_REFRESH_EXPIRES as jwt.SignOptions['expiresIn'];
    }
    return jwt.sign(payload, env.JWT_REFRESH_SECRET as jwt.Secret, opts);
}

export function verifyAccessToken(token: string): JwtUser {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET as jwt.Secret);
    if (typeof decoded === 'string') throw new Error('Invalid token payload');
    return decoded as JwtUser;
}

export function verifyRefreshToken(token: string): JwtUser {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET as jwt.Secret);
    if (typeof decoded === 'string') throw new Error('Invalid token payload');
    return decoded as JwtUser;
}
