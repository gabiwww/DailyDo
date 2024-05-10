import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Put
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {
  ApiBadRequestExceptionResponse,
  ApiConflictExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiUnauthorizedExceptionResponse,
} from './decorators/exceptions.decorator';
import { JwtTokenDto } from './dto/auth/jwt-token.dto';
import { BooleanResponseDto } from './dto/common/boolean-response.dto';
import { HabitResponseDto } from './dto/habit/habit-response.dto';
import { HabitUpdateDto } from './dto/habit/habit-update.dto';

import { HabitDto } from './dto/habit/habit.dto';
import { UserCredentialsDto } from './dto/user/user-credentials.dto';
import { UserProfileDto } from './dto/user/user-profile.dto';
import { HabitEntity } from './entities/habit.entity';
import { HabitsService } from './habits/habits.service';
import { RequestWithUser } from './interface/auth.interface';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly habitsService: HabitsService,
  ) {}

  @Post('auth/register')
  @ApiBody({
    description: 'User credentials',
    type: UserCredentialsDto,
  })
  @ApiCreatedResponse({ type: BooleanResponseDto })
  @ApiBadRequestExceptionResponse()
  @ApiConflictExceptionResponse()
  async register(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<BooleanResponseDto> {
    return { success: await this.authService.register(userCredentialsDto) };
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description: 'User credentials',
    type: UserCredentialsDto,
  })
  @ApiCreatedResponse({
    description: 'JWT access and refresh token',
    type: JwtTokenDto,
  })
  @ApiUnauthorizedExceptionResponse()
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserProfileDto })
  @ApiUnauthorizedExceptionResponse()
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Get('habits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'All habits',
    type: HabitResponseDto,
  })
  @ApiUnauthorizedExceptionResponse()
  async getAllHabits(
    @Request() req: RequestWithUser,
  ): Promise<HabitResponseDto> {
    const [habits, count] = await this.habitsService.findAll(req.user);
    return { count, habits };
  }

  @Get('habit/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Habit',
    type: HabitEntity,
  })
  @ApiNotFoundExceptionResponse()
  @ApiUnauthorizedExceptionResponse()
  @ApiBadRequestExceptionResponse()
  async getAddressById(
    @Param('id') id: number,
    @Request() req: RequestWithUser,
  ): Promise<HabitEntity> {
    if (!+id) throw new BadRequestException('Invalid id param');

    return await this.habitsService.findOneById(+id, req.user);
  }

  @Delete('habit/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete habit',
    type: BooleanResponseDto,
  })
  @ApiNotFoundExceptionResponse()
  @ApiUnauthorizedExceptionResponse()
  @ApiBadRequestExceptionResponse()
  async deleteAddressById(
    @Param('id') id: number,
  ): Promise<BooleanResponseDto> {
    if (!+id) throw new BadRequestException('Invalid id param');

    return { success: await this.habitsService.deleteOneById(+id) };
  }

  @Post('habits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Habit',
    type: HabitDto,
  })
  @ApiCreatedResponse({
    description: 'Added new habit',
    type: BooleanResponseDto,
  })
  @ApiBadRequestExceptionResponse()
  async create(
    @Body() habitDto: HabitDto,
    @Request() req: RequestWithUser,
  ): Promise<BooleanResponseDto> {
    return { success: await this.habitsService.create(habitDto, req.user) };
  }

  @Put('habits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Edit habit',
    type: HabitUpdateDto,
  })
  @ApiCreatedResponse({
    description: 'Edit habit',
    type: BooleanResponseDto,
  })
  @ApiBadRequestExceptionResponse()
  async update(
    @Body() habitUpdateDto: HabitUpdateDto,
    @Request() req: RequestWithUser,
  ): Promise<BooleanResponseDto> {
    return { success: await this.habitsService.update(habitUpdateDto, req.user) };
  }

}
