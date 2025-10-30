import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('card_label_map')
export class CardLabelMap {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    cardId: string;

    @Column('uuid')
    labelId: string;

    constructor(cardId: string, labelId: string) {
        this.cardId = cardId;
        this.labelId = labelId;
    }
}
