import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id!: string;  // Use the non-null assertion operator

    @Column('text')
    message: string;

    @Column('boolean', { default: false })
    read: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    // Constructor để khởi tạo các thuộc tính.
    constructor(message: string, read: boolean = false, user: User) {
        this.message = message;
        this.read = read;
        this.user = user;
        this.createdAt = new Date();
    }
}
