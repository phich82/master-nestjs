import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @CreateDateColumn({ name: 'when' })
  when: Date;

  @Column({ length: 100, nullable: true })
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
