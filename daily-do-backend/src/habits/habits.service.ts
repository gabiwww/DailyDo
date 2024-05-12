import { Injectable, NotFoundException } from '@nestjs/common';
import { HabitEntity } from '../entities/habit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { HabitDto } from 'src/dto/habit/habit.dto';
import { UserPayload } from 'src/interface/auth.interface';
import { HabitUpdateDto } from 'src/dto/habit/habit-update.dto';
import { ActivitiesService } from 'src/activities/activities.service';
import { ActivityEntity } from 'src/entities/activity.entity';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private habitsRepository: Repository<HabitEntity>,
    private usersService: UsersService,
    private activitiesService: ActivitiesService,

  ) {}

  @Cron('1 0 0 * * *')
  async createActivity(days: string[]) {
    const date = new Date();
    const daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    const allTodayHabits = await this.habitsRepository.find({
      where: {days: ArrayContains([currentDayOfWeek])},
    });

    allTodayHabits.forEach(async habitEntity => {
      console.log('each habit', habitEntity);
      const activityEntity = new ActivityEntity();
      activityEntity.isChecked = false;
      activityEntity.habit = habitEntity;
      await this.activitiesService.createInDb(activityEntity)
    });


  }

  async findAll(user: UserPayload): Promise<[HabitEntity[], number]> {
    const owner = await this.usersService.findOneById(user.id);

    return await this.habitsRepository.findAndCount({
      where: { owner: { id: owner.id } },
    });
  }

  async findOneById(id: number, user: UserPayload): Promise<HabitEntity> {
    const habit = await this.habitsRepository.findOne({
      where: {
        id,
      },
    });
    if (!habit) throw new NotFoundException();

    return habit;
  }

  async deleteOneById(id: number): Promise<boolean> {
    const response = await this.habitsRepository.delete({
      id,
    });
    const { affected } = response;
    if (!affected) throw new NotFoundException();

    return true;
  }

  async create(habitDto: HabitDto, user: UserPayload): Promise<boolean> {
    const { days, hour } = habitDto;

    const userEntity = await this.usersService.findOneById(user.id);

    const habitEntity = habitDto.toEntity(userEntity);
    await this.habitsRepository.insert(habitEntity);

    if (this.isTheDay(days, hour)) {
      const activityEntity = new ActivityEntity();
      activityEntity.isChecked = false;
      activityEntity.habit = habitEntity;
      await this.activitiesService.createInDb(activityEntity)
    };
    return true;
  }

  async update(
    habitUpdateDto: HabitUpdateDto,
    user: UserPayload,
  ): Promise<boolean> {
    const { id, name, note, days, hour } = habitUpdateDto;

    const habitToUpdate = await this.habitsRepository.findOneBy({ id: id });
    if (!habitToUpdate) throw new NotFoundException();

    habitToUpdate.name = name;
    habitToUpdate.note = note;
    habitToUpdate.days = days.map((day)=>day.toUpperCase());
    habitToUpdate.hour = hour;

    await this.habitsRepository.save(habitToUpdate);

    return true;
  }

  isTheDay(days: string[], hour: string): boolean {
    const date = new Date();
    const daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    const currentTime = date.toLocaleTimeString();
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    let result = false;
    if (days.includes(currentDayOfWeek.toUpperCase())) {
      let currentTimeToCompare = currentTime.split(':');
      let hourToCompare = hour.split(':');

      if (Number(currentTimeToCompare[0]) < Number(hourToCompare[0])) {
        result = true;
      } else if (
        Number(currentTimeToCompare[0]) == Number(hourToCompare[0]) &&
        Number(currentTimeToCompare[1]) < Number(hourToCompare[1])
      ) {
        result = true;
      } else {
        result = false;
      }
    }

    return result;
  }
}
