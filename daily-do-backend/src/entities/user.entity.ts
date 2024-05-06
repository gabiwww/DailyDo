import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';


@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', { length: 300, unique: true })
  username: string;

  @Column('varchar', { length: 300 })
  password: string;
}

