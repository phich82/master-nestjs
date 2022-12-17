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
} from '@/shared';
import { CreateEventDto } from './dto/CreateEventDto';
import { EventDto } from './dto/EventDto';
import { EventQueryParam } from './EventQueryParam';
import { UpdateEventDto } from './dto/UpdateEventDto';
import { EventService } from './services/event.service';
import { Event } from './entities/event.entity';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';

@Controller('/events')
export class EventController {
  constructor(
    private apiResponse: ApiResponse<any, ErrorJsonResponse>,
    private eventService: EventService,
  ) {}

  @Get('/all')
  async searchAll(): Promise<JsonResponse<Event[], ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.searchAll());
  }

  @Get()
  async searchBy(
    @Query() params: EventQueryParam,
  ): Promise<JsonResponse<EventDto[], ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.searchBy(params));
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<JsonResponse<EventDto, ErrorJsonResponse>> {
    console.log(typeof id);
    return this.apiResponse.success(await this.eventService.find(id));
  }

  @Post()
  async create(
    // @Body(ValidationPipe) params: CreateEventDto,
    @Body(new ValidationPipe({ groups: ['create'] })) params: CreateEventDto,
  ): Promise<JsonResponse<EventDto, ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.create(params));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ groups: ['update'] })) params: UpdateEventDto,
  ): Promise<JsonResponse<EventDto, ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.update(id, params));
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: number,
    @Body() params: UpdateEventDto,
  ): Promise<JsonResponse<EventDto, ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.updatePartial(id, params));
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<JsonResponse<any, ErrorJsonResponse>> {
    return this.apiResponse.success(await this.eventService.destroy(id));
  }
}
