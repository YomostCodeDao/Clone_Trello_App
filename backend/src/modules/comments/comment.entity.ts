import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    content: string;

    @ManyToOne(() => Card)
    @JoinColumn({ name: 'card_id' })
    card: Card;

    @Column('uuid')
    cardId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'author_id' })
    author: User;

    @Column('uuid')
    authorId: string;

    @CreateDateColumn()
    createdAt: Date;

    // Constructor để khởi tạo tất cả các thuộc tính
    constructor(content: string, card: Card, cardId: string, author: User, authorId: string, createdAt: Date) {
        this.content = content;
        this.card = card;
        this.cardId = cardId;
        this.authorId = authorId;
        this.author = author;
        this.createdAt = createdAt;
    }
}
