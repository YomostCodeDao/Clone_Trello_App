import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { List } from '../lists/list.entity';

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('timestamp', { nullable: true })
    dueDate: Date;

    @Column()
    position: number;

    @ManyToOne(() => List)
    @JoinColumn({ name: 'list_id' })
    list: List;

    @Column('uuid')
    listId: string;

    constructor(title: string, description: string, dueDate: Date, list: List, position: number, listId: string) {
        this.title = title;
        this.description = description;
        this.position = position;
        this.listId = listId;
        this.dueDate = dueDate;
        this.list = list;
    }
}
