import { Injectable, NotFoundException } from '@nestjs/common';
import { HabitEntity } from '../entities/habit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, In, MongoBatchReExecutionError, RelationCount, Repository, Timestamp } from 'typeorm';
import { UsersService } from '../users/users.service';
import { HabitDto } from 'src/dto/habit/habit.dto';
import { UserPayload } from 'src/interface/auth.interface';
import { HabitUpdateDto } from 'src/dto/habit/habit-update.dto';
import { ActivitiesService } from 'src/activities/activities.service';
import { ActivityEntity } from 'src/entities/activity.entity';
import { Cron } from '@nestjs/schedule';
import { formatDistance, isAfter, isBefore, subDays } from "date-fns";


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

  filterByMonthAndYear(activities:ActivityEntity[], month:number, year:number){
    const result = activities.filter((activity)=> {
      if(activity.createDateTime.getMonth()==month && activity.createDateTime.getFullYear()==year)
      {return true};
      return false
    });
    return result;
  }

  filterByDay(activities:ActivityEntity[], day:number, month:number, year:number){
    const result = activities.filter((activity)=> {
      if(activity.createDateTime.getDate()==day && activity.createDateTime.getMonth()==month && activity.createDateTime.getFullYear()==year)
      {return true};
      return false
    });
    return result;
  }

  filterByChecked(activities:ActivityEntity[]){
    const result = activities.filter((activity)=> {
      if(activity.isChecked){return true};
      return false
    });
    return result;
  }

  statisticsMonth(monthNumber:number, activities:ActivityEntity[] ){
    const date = new Date();
    const actualMonth = date.getMonth();
    const actualYear = date.getFullYear();
    let month =0;
    let year=0;
    if ((actualMonth - monthNumber + 1)>0){
       month = actualMonth - monthNumber + 1
       year = actualYear
    }
    else {
       month = actualMonth - monthNumber + 13
       year = actualYear -1
    };

    const filteredActivities = this.filterByMonthAndYear(activities, month, year);
    const filteredActivitiesCount =  filteredActivities.length;
    const checkedActivitiesCount = this.filterByChecked(filteredActivities).length;
    const successPercent = checkedActivitiesCount/filteredActivitiesCount*100;

    return successPercent;

  }

  filterByWeek(weekStart:Date, weekEnd:Date, activities:ActivityEntity[]){
    const result = activities.filter((activity)=> {
      if(isAfter(activity.createDateTime, weekStart) && isBefore(activity.createDateTime, weekEnd)){return true};
      return false
    });
    return result;
  }

  statisticsByWeek(weekNumber:number, activities:ActivityEntity[] ){
    const today = new Date();
    const startOfWeek = subDays(today, weekNumber*7-1);
    const endOfWeek = subDays(today, (weekNumber-1)*7);
    const filteredActivities = this.filterByWeek(startOfWeek, endOfWeek, activities);

    const filteredActivitiesCount =  filteredActivities.length;
    const checkedActivitiesCount = this.filterByChecked(filteredActivities).length;
    const successPercent = checkedActivitiesCount/filteredActivitiesCount*100;

    return successPercent;

  }


  daysInMoth(month:number, year:number){
    return new Date(year, month, 0).getDate();
  }

  statisticsDay(dayNumber:number, activities:ActivityEntity[] ){
    const date = new Date();
    const actualDay = date.getDate();
    const actualMonth = date.getMonth();
    const actualYear = date.getFullYear();
    let day = 0;
    let month = actualMonth;
    let year = actualYear;

    if ((actualDay - dayNumber +1)>0){
      day = actualDay - dayNumber +1;
    }
    else {
      if(actualMonth>1){
        month = actualMonth - 1;
        day = actualDay - dayNumber + this.daysInMoth(month, year) +1
      }
      else{
        month = actualMonth + 11;
        year = actualYear-1;
        day = actualDay - dayNumber + this.daysInMoth(month, year) +1
      }
    }
    const filteredActivities = this.filterByDay(activities, day, month, year);
    const filteredActivitiesCount =  filteredActivities.length;
    const checkedActivitiesCount = this.filterByChecked(filteredActivities).length;
    const successPercent = checkedActivitiesCount/filteredActivitiesCount*100;

    return successPercent;

  }

  async statisticsById(habitId: number, user: UserPayload) {

    const activities = await this.activitiesService.findByHabitId(habitId);
    let result = { 
      months: { 
        month1: this.statisticsMonth(1, activities), 
        month2: this.statisticsMonth(2, activities),
        month3: this.statisticsMonth(3, activities), 
        month4: this.statisticsMonth(4, activities),
        month5: this.statisticsMonth(5, activities), 
        month6: this.statisticsMonth(6, activities),
        month7: this.statisticsMonth(7, activities), 
        month8: this.statisticsMonth(8, activities),
        month9: this.statisticsMonth(9, activities), 
        month10: this.statisticsMonth(10, activities),
        month11: this.statisticsMonth(11, activities), 
        month12: this.statisticsMonth(12, activities), 
      },
      weeks: {
        week1: this.statisticsByWeek(1, activities),
        week2: this.statisticsByWeek(2, activities),
        week3: this.statisticsByWeek(3, activities),
        week4: this.statisticsByWeek(4, activities),
        week5: this.statisticsByWeek(5, activities),
      },
      days:
      {
        day1: this.statisticsDay(1, activities),
        day2: this.statisticsDay(2, activities),
        day3: this.statisticsDay(3, activities),
        day4: this.statisticsDay(4, activities),
        day5: this.statisticsDay(5, activities),
        day6: this.statisticsDay(6, activities),
        day7: this.statisticsDay(7, activities),
      }
  };

  console.log('result', result);

  return result;
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

    const daysUpper = days.map((day)=>day.toUpperCase());
    if (daysUpper.includes(currentDayOfWeek.toUpperCase())) {
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
