/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

import { EventQueryParam } from '../EventQueryParam';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {

  private readonly logger: Logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository
  ) {}

  async searchAll(): Promise<Event[]> {
    this.logger.log('search all');
    this.logger.debug('search all');
    return await this.eventRepository.find();
  }

  async searchBy(paramsQuery: EventQueryParam): Promise<Event[]> {
    const conditions = [];
    if (paramsQuery.name) {
      conditions.push({ name: ILike(`%${paramsQuery.name}%`) });
    }
    if (paramsQuery.description) {
      conditions.push({ description: ILike(`%${paramsQuery.description}%`) });
    }
    if (paramsQuery.when) {
      conditions.push({ when: ILike(`%${paramsQuery.when}%`) });
    }
    if (paramsQuery.address) {
      conditions.push({ when: ILike(`%${paramsQuery.address}%`) });
    }
    return await this.eventRepository.findBy(conditions);
  }

  async find(id: number): Promise<Event> {
    // return await this.eventRepository.findOne({ where: { id } });
    return await this.eventRepository.findOneBy({ id });
  }

  async create(params: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save({
      ...params,
      when: new Date(params.when),
    });
  }

  async update(id: number, params: UpdateEventDto): Promise<Event> {
    const event = await this.find(id);
    if (!event) {
      throw new NotFoundException(`ID [${id} Not Found]`);
    }
    return await this.eventRepository.save({
      ...event,
      ...params,
      when: params.when ? new Date(params.when) : event.when,
    });
  }

  async updatePartial(id: number, params: UpdateEventDto): Promise<Event> {
    const event = await this.find(id);
    if (!event) {
      throw new NotFoundException(`ID [${id} Not Found]`);
    }
    return await this.eventRepository.save({
      ...event,
      ...params,
      when: params.when ? new Date(params.when).toString() : event.when,
    });
  }

  async destroy(id: number): Promise<boolean> {
    const event = await this.find(id);
    if (!event) {
      throw new NotFoundException(`ID [${id} Not Found]`);
    }
    return (await this.eventRepository.delete(id)).affected > 0;
  }

  async destroyMany(ids: Array<number>): Promise<number> {
    return (await this.eventRepository.delete(ids)).affected;
  }
}
