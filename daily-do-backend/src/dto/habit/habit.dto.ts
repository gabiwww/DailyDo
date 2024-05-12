import {
  ArrayMinSize,
  IsArray,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HabitEntity } from 'src/entities/habit.entity';
import { UserEntity } from 'src/entities/user.entity';

export class HabitDto implements Readonly<HabitDto> {
  @ApiProperty()
  @IsString()
  @Length(3, 300)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(0, 1000)
  note: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  days: string[];

  @ApiProperty()
  @IsString()
  @Length(1, 5)
  hour: string;

  public toEntity(owner: UserEntity) {
    const it = new HabitEntity();
    it.name = this.name;
    it.note = this.note;
    it.days = this.days.map((day)=>day.toUpperCase());
    it.hour = this.hour;
    it.owner = owner;
    it.createDateTime = new Date();
    return it;
  }
}
