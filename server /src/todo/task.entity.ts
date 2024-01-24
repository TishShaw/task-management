import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}