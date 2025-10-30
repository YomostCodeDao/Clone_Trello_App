import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ default: 'local' })
    provider: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @Column('uuid')
    profileId: string;

    constructor(
        id: string,
        email: string,
        passwordHash: string,
        name: string,
        avatarUrl: string,
        provider: string,
        updatedAt: Date,
        profileId: string,
        profile: Profile,
    ) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.provider = provider;
        this.updatedAt = updatedAt;
        this.createdAt = new Date();
        this.profileId = profileId;
        this.profile = profile;
    }
}
