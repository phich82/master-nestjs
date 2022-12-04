/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiResponse,
  ErrorJsonResponse,
  JsonResponse,
  QueryParam,
} from 'src/shared';
import { Event } from './Event';
import { CreateEventDto } from './dto/CreateEventDto';
import { EventDto } from './dto/EventDto';
import { EventQueryParam } from './EventQueryParam';
import { UpdateEventDto } from './dto/UpdateEventDto';
import { EventService } from './services/event.service';

@Controller('/events')
export class EventController {
  constructor(
    private apiResponse: ApiResponse<any, ErrorJsonResponse>,
    private eventService: EventService,
  ) {}

  @Get('/all')
  searchAll(): JsonResponse<EventDto[], ErrorJsonResponse> {
    return this.apiResponse.success(this.eventService.searchAll());
  }

  @Get()
  searchBy(
    @Query() params: EventQueryParam,
  ): JsonResponse<EventDto[], ErrorJsonResponse> {
    return this.apiResponse.success(this.eventService.searchBy(params));
  }

  @Get(':id')
  find(@Param('id') id: number): JsonResponse<EventDto, ErrorJsonResponse> {
    return this.apiResponse.success(
      [
        new EventDto('Name 1', 'Description 1', 'AM', 'Address 1', 1),
        new EventDto('Name 2', 'Description 2', 'PM', 'Address 2', 2),
        new EventDto('Name 3', 'Description 3', 'PM', 'Address 3', 3),
      ].find((r) => r.id == id) || null,
    );
  }

  @Post()
  create(
    @Body() params: CreateEventDto,
  ): JsonResponse<EventDto, ErrorJsonResponse> {
    return this.apiResponse.success(this.eventService.create(params));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() params: Event,
  ): JsonResponse<EventDto, ErrorJsonResponse> {
    return this.apiResponse.success();
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: number,
    @Body() params: UpdateEventDto,
  ): JsonResponse<EventDto, ErrorJsonResponse> {
    return this.apiResponse.success(new EventDto());
  }

  @Delete(':id')
  destroy(@Param('id') id: number): JsonResponse<any, ErrorJsonResponse> {
    return this.apiResponse.success();
  }
}
