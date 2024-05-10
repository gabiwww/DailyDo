import { Injectable, NotFoundException } from '@nestjs/common';
import { HabitEntity } from '../entities/habit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { HabitDto } from 'src/dto/habit/habit.dto';
import { UserPayload } from 'src/interface/auth.interface';
import { HabitUpdateDto } from 'src/dto/habit/habit-update.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private habitsRepository: Repository<HabitEntity>,
    private usersService: UsersService,
  ) {}

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
    const { name, days, hour } = habitDto;

    const userEntity = await this.usersService.findOneById(user.id);

    const habitEntity = habitDto.toEntity(userEntity);
    await this.habitsRepository.insert(habitEntity);
    return true;
  }

  async update(habitUpdateDto: HabitUpdateDto, user: UserPayload): Promise<boolean> {
    const { id, name, days, hour } = habitUpdateDto;

    const habitToUpdate = await this.habitsRepository.findOneBy({id:id});
    if (!habitToUpdate) throw new NotFoundException();
    
    habitToUpdate.name = name;
    habitToUpdate.days = days;
    habitToUpdate.hour = hour;

    await this.habitsRepository.save(habitToUpdate)

    return true;
  }
}
