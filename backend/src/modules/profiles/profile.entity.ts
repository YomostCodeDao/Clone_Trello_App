import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    bio: string;

    @Column('text', { nullable: true })
    timezone: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column('uuid')
    userId: string;

    constructor(bio: string, timezone: string, userId: string, user: User) {
        this.bio = bio;
        this.timezone = timezone;
        this.userId = userId;
        this.user = user;
    }
}
