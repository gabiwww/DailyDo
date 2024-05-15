import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitEntity } from '../entities/habit.entity';
import { ActivitiesService } from './activities.service';
import { ActivityEntity } from 'src/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, HabitEntity])],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
