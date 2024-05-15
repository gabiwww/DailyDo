import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { HabitsModule } from './habits/habits.module';
import { ActivitiesModule } from './activities/activities.module';
import { ScheduleModule } from '@nestjs/schedule';

config();
@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ActivitiesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        ssl: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    HabitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
