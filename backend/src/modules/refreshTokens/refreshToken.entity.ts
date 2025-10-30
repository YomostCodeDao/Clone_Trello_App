import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string;

    @Column()
    token: string;

    @Column({ default: false })
    revoked: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    expiresAt: Date;

    constructor(id: string, userId: string, token: string, revoked: boolean = false, expiresAt: Date) {
        this.id = id; // id sẽ được tự động tạo bởi TypeORM
        this.userId = userId;
        this.token = token;
        this.revoked = revoked;
        this.expiresAt = expiresAt;
        this.createdAt = new Date(); // Khởi tạo createdAt trong constructor nếu muốn
    }
}
