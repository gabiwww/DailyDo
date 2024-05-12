import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { HabitEntity } from '../entities/habit.entity';
import { HabitsService } from './habits.service';
import { UsersModule } from 'src/users/users.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, ActivitiesModule, TypeOrmModule.forFeature([HabitEntity, UserEntity])],
  providers: [HabitsService],
  exports: [HabitsService],
})
export class HabitsModule {}
