import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('card_labels')
export class CardLabel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    projectId: string;

    @Column()
    name: string;

    @Column()
    color: string;

    constructor(projectId: string, name: string, color: string) {
        this.projectId = projectId;
        this.name = name;
        this.color = color;
    }
}
