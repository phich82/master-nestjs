import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @OneToOne(() => User)
  @JoinColumn() // generated colmun name: userId
  user: User;
}
