import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './events/services/event.service';
import { EventController } from './events/event.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiResponse } from './shared';
import { Event } from './events/entities/event.entity';
import ormConfig from '@config/orm.config';
import { EventRepository } from './events/repositories/event.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      // envFilePath: `${process.env.NODE_ENV}.env`,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
      imports: undefined,
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, EventController],
  providers: [EventService, AppService, ApiResponse],
})
export class AppModule {}
