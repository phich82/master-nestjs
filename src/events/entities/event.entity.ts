import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn({ name: 'when'})
  when: Date;

  @Column({ length: 100 })
  address: string;
}
