import { EventService } from './events/services/event.service';
import { EventController } from './events/event.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiResponse } from './shared';

@Module({
  imports: [],
  controllers: [EventController, AppController],
  providers: [EventService, AppService, ApiResponse],
})
export class AppModule {}
