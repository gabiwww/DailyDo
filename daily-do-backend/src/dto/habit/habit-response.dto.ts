import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HabitEntity } from '../../entities/habit.entity';

export class HabitResponseDto implements Readonly<HabitResponseDto> {
  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty({ type: [HabitEntity] })
  habits: HabitEntity[];
}
