import {
  ArrayMinSize,
  IsArray,
  IsString,
  Length,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HabitEntity } from 'src/entities/habit.entity';
import { ActivityEntity } from 'src/entities/activity.entity';

export class ActivityUpdateDto implements Readonly<ActivityUpdateDto> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsBoolean()
  isChecked: boolean;

  public toEntity(habit: HabitEntity) {
    const it = new ActivityEntity();
    it.isChecked = this.isChecked;
    it.habit = habit;
    it.createDateTime = new Date();
    return it;
  }
}
