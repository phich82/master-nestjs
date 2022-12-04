/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Event } from '../Event';
import { EventQueryParam } from '../EventQueryParam';
import { CreateEventDto } from './../dto/CreateEventDto';
import { UpdateEventDto } from './../dto/UpdateEventDto';

@Injectable()
export class EventService {
  private events: Event[] = [];

  searchAll(): Event[] {
    return this.events;
  }

  searchBy(paramsQuery: EventQueryParam): Event[] {
    return this.events.filter((event) =>
      event.name.toLowerCase().includes(paramsQuery.name.toLowerCase()),
    );
  }

  find(id: number): Event {
    return this.events.find((event) => event.id === Number(id)) || null
  }

  create(params: CreateEventDto) {
    const id = this.events.length < 1 ? 1 : Math.max(...this.events.map((event) => event.id)) + 1;
    const event: Event = {
      ...params,
      when: params.when ? new Date(params.when): new Date,
      id,
    }
    this.events.push(event);
    return event;
  }

  update(id: number, params: UpdateEventDto): Event {
    const index = this.events.findIndex((event) => event.id === Number(id));
    if (index >= 0) {
      this.events[index] = {
        ...this.events[index],
        ...params,
        when: params.when ? new Date(params.when) : this.events[index].when,
        id: this.events[index].id,
      };
      return this.events[index];
    }
    return null;
  }

  updatePartial(id: number, params: UpdateEventDto): Event {
    const index = this.events.findIndex((event) => event.id === Number(id));
    if (index >= 0) {
      this.events[index] = {
        ...this.events[index],
        ...params,
        when: params.when ? new Date(params.when) : this.events[index].when,
        id: this.events[index].id,
      }
      return this.events[index];
    }
    return null;
  }

  destroy(id: number): boolean {
    const index = this.events.findIndex((event) => event.id === Number(id));
    if (index >= 0) {
      this.events.splice(index, 1);
      return true;
    }
    return false;
  }

  destroyMany(ids: Array<number>): number {
    let deletedCount = 0;
    ids.forEach((id) => {
      if (this.destroy(id)) {
        deletedCount++;
      }
    });
    return deletedCount;
  }
}
