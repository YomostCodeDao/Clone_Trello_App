import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    key: string;

    @Column('uuid')
    ownerId: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(id: string, name: string, key: string, ownerId: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
    }
}
