// src/modules/auth/auth.service.ts
import { AppDataSource } from '../../db/data-source';
import { User } from '../users/user.entity';
import { comparePassword, hashPassword, hashValue, compareValue } from '../../common/utils/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../common/utils/jwt';
import { RefreshToken } from './refresh_token.entity';
import { env } from '../../config/env';
import { add } from 'date-fns';

// Assertion function: sau khi gọi hàm này, TS biết chắc user có passwordHash: string
function assertHasPassword(
    u: User | null | undefined
): asserts u is User & { passwordHash: string } {
    if (!u || typeof u.passwordHash !== 'string' || u.passwordHash.length === 0) {
        throw new Error('Invalid credentials');
    }
}

export class AuthService {
    private userRepo = AppDataSource.getRepository(User);
    private rtRepo = AppDataSource.getRepository(RefreshToken);

    async register(email: string, password: string, name?: string) {
        const existed = await this.userRepo.findOne({ where: { email } });
        if (existed) throw new Error('Email already registered');

        const passwordHash = await hashPassword(password);
        const user = this.userRepo.create({
            email,
            passwordHash,
            ...(name ? { name } : {}),
            provider: 'local' as const,
        });

        const saved = await this.userRepo.save(user);
        return this.issueTokens(saved);
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });

        // ép undefined -> null để type còn lại là string | null (dễ narrow)
        const passwordHash = (user?.passwordHash ?? null) as string | null;

        if (!user || passwordHash === null) {
            throw new Error('Invalid credentials');
        }

        const ok = await comparePassword(password, passwordHash); // <- giờ là string
        if (!ok) throw new Error('Invalid credentials');

        return this.issueTokens(user);
    }

    private async issueTokens(user: User) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        const expiresAt = add(new Date(), this.parseDuration(env.JWT_REFRESH_EXPIRES));
        const tokenHash = await hashValue(refreshToken);

        const rt = this.rtRepo.create({
            userId: user.id,
            tokenHash,
            expiresAt,
            revoked: false,
        });
        await this.rtRepo.save(rt);

        return {
            accessToken,
            refreshToken,
            user: { id: user.id, email: user.email, name: user.name },
        };
    }

    async refresh(oldToken: string) {
        const payload = verifyRefreshToken(oldToken);
        const user = await this.userRepo.findOneByOrFail({ id: payload.sub });

        const actives = await this.rtRepo.find({
            where: { userId: user.id, revoked: false },
        });
        if (!actives.length) throw new Error('No active refresh token');

        let matched: RefreshToken | undefined;
        for (const rec of actives) {
            if (await compareValue(oldToken, rec.tokenHash)) {
                matched = rec;
                break;
            }
        }
        if (!matched) throw new Error('Refresh token not recognized');

        matched.revoked = true;
        await this.rtRepo.save(matched);

        return this.issueTokens(user);
    }

    async logout(userId: string) {
        await this.rtRepo
            .createQueryBuilder()
            .update(RefreshToken)
            .set({ revoked: true })
            .where('user_id = :userId AND revoked = false', { userId })
            .execute();
    }

    private parseDuration(spec: string) {
        // match: ["15m","15","m"] hoặc null
        const match = spec.match(/^(\d+)([smhd])$/);

        // Ép về string chắc chắn: nếu không match thì dùng '7' và 'd'
        const n = parseInt(match?.[1] ?? '7', 10);
        const u = (match?.[2] ?? 'd') as 's' | 'm' | 'h' | 'd';

        switch (u) {
            case 's': return { seconds: n } as const;
            case 'm': return { minutes: n } as const;
            case 'h': return { hours: n } as const;
            default: return { days: n } as const;
        }
    }



}
