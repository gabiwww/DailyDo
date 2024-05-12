import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayload } from 'src/interface/auth.interface';
import { ActivityEntity } from 'src/entities/activity.entity';
import { ActivityUpdateDto } from 'src/dto/activity/activity-update.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activitiesRepository: Repository<ActivityEntity>,
  ) {}

  async findOneById(id: number, user: UserPayload): Promise<ActivityEntity> {
    const activity = await this.activitiesRepository.findOne({
      where: {
        id,
      },
    });
    if (!activity) throw new NotFoundException();

    return activity;
  }
  async checkActivity(activityUpdateDto: ActivityUpdateDto, user: UserPayload): Promise<boolean> {
    const { id, isChecked } = activityUpdateDto;

    const activityToUpdate = await this.activitiesRepository.findOneBy({id:id});
    if (!activityToUpdate) throw new NotFoundException();
    
    activityToUpdate.isChecked = isChecked;

    await this.activitiesRepository.save(activityToUpdate)

    return true;
  }

  async createInDb(activityEntity: ActivityEntity) {

    return await this.activitiesRepository.save(activityEntity)

  }
  
}
