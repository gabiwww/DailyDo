import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ActivityEntity } from './activity.entity';

@Entity('habits')
export class HabitEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column('varchar', { length: 300 })
  name: string;

  @ApiProperty()
  @Column('varchar', { length: 1000 })
  note: string;

  @ApiProperty()
  @Column('varchar', { array: true })
  days: string[];

  @ApiProperty()
  @Column('varchar', { length: 300 })
  hour: string;

  @ManyToOne(() => UserEntity, (user) => user.habits)
  @JoinTable()
  owner: UserEntity;

  @OneToMany(() => ActivityEntity, (activity) => activity.habit)
  activities: Array<HabitEntity>;
}
