import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponse } from '@/shared';
import { EventController } from './event.controller';
import { EventService } from './services/event.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [
    EventController,
  ],
  providers: [
    EventService,
    ApiResponse,
  ],
})
export class EventModule { }
