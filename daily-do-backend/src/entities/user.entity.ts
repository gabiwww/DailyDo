import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { HabitEntity } from './habit.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', { length: 300, unique: true })
  username: string;

  @Column('varchar', { length: 300 })
  password: string;

  @OneToMany(() => HabitEntity, (habit) => habit.owner)
  habits: Array<HabitEntity>;
}
