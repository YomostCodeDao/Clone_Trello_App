import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('oauth_accounts')
export class OAuthAccount {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    userId: string;

    @Column()
    provider: string;

    @Column()
    providerUserId: string;

    constructor(userId: string, provider: string, providerUserId: string) {
        this.userId = userId;
        this.provider = provider;
        this.providerUserId = providerUserId;
    }
}
