import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { HabitEntity } from './habit.entity';
import { UserEntity } from './user.entity';

@Entity('activities')
export class ActivityEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column('boolean')
  isChecked: boolean;

  @ManyToOne(() => HabitEntity, (habit) => habit.activities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  habit: HabitEntity;
}
