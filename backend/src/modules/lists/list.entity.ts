import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity('lists')
export class List {
    @PrimaryGeneratedColumn('uuid')
    id!: string; // Use the non-null assertion operator for auto-generated id

    @Column()
    name: string;

    @Column()
    position: number;

    @ManyToOne(() => Board, { nullable: false })  // Many-to-one relationship with Board
    @JoinColumn({ name: 'board_id' })
    board: Board;

    @Column('uuid')
    boardId: string;

    // Constructor to initialize properties
    constructor(name: string, position: number, boardId: string, board: Board) {
        this.name = name;
        this.position = position;
        this.boardId = boardId;
        this.board = board; // Initializing the board relationship
    }
}
