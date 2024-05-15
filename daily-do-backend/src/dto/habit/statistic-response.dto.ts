import { ApiProperty } from '@nestjs/swagger';

class MonthsResponseDto implements Readonly<MonthsResponseDto> {
    @ApiProperty()
    month1: number | null

    @ApiProperty()
    month2: number | null

    @ApiProperty()
    month3: number | null

    @ApiProperty()
    month4: number | null

    @ApiProperty()
    month5: number | null

    @ApiProperty()
    month6: number | null

    @ApiProperty()
    month7: number | null

    @ApiProperty()
    month8: number | null

    @ApiProperty()
    month9: number | null

    @ApiProperty()
    month10: number | null

    @ApiProperty()
    month11: number | null

    @ApiProperty()
    month12: number | null
  };

  class WeeksResponseDto implements Readonly<WeeksResponseDto> {
    @ApiProperty()
    week1: number | null

    @ApiProperty()
    week2: number | null

    @ApiProperty()
    week3: number | null

    @ApiProperty()
    week4: number | null

    @ApiProperty()
    week5: number | null
};

class DaysResponseDto implements Readonly<DaysResponseDto> {
    @ApiProperty()
    day1: number | null

    @ApiProperty()
    day2: number | null

    @ApiProperty()
    day3: number | null

    @ApiProperty()
    day4: number | null

    @ApiProperty()
    day5: number | null

    @ApiProperty()
    day6: number | null

    @ApiProperty()
    day7: number | null

}

export class StatisticResponseDto implements Readonly<StatisticResponseDto> {
  @ApiProperty()
  months: MonthsResponseDto

  @ApiProperty()
  weeks: WeeksResponseDto

  @ApiProperty()
  days: DaysResponseDto
}
