import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from './project.entity';

@Entity('memberships')
export class Membership {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string;

    @Column('uuid')
    projectId: string;

    @Column()
    role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER'; // Enum for roles

    constructor(id: string, userId: string, projectId: string, role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER') {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
        this.role = role;
    }
}
