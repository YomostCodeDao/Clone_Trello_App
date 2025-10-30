import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('boards')
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name: string;

    @Column()
    position: number;

    @Column({ nullable: true })
    templateKey: string;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column('uuid')
    projectId: string;

    constructor(name: string, position: number, templateKey: string, project: Project, projectId: string) {
        this.name = name;
        this.position = position;
        this.templateKey = templateKey;
        this.projectId = projectId;
        this.project = project;
    }
}
