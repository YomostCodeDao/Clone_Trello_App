// src/modules/auth/refresh_token.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../entities/BaseEntity';
import { User } from '../users/user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends BaseEntity {
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Index()
    @Column({ name: 'user_id' })
    userId!: string;

    @Column({ name: 'token_hash' })
    tokenHash!: string;

    @Column({ default: false })
    revoked!: boolean;

    @Column({ name: 'expires_at', type: 'timestamptz' })
    expiresAt!: Date;
}
