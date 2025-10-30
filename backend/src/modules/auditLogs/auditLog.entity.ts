import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    actorId: string;

    @Column()
    action: string;

    @Column('text')
    entityType: string;

    @Column('uuid')
    entityId: string;

    @Column('jsonb')
    diff: object;

    @CreateDateColumn()
    createdAt: Date;

    constructor(
        actorId: string,
        action: string,
        entityType: string,
        entityId: string,
        diff: object
    ) {
        this.actorId = actorId;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.diff = diff;
    }
}
