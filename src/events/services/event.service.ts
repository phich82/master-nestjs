/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Event } from '../Event';
import { EventQueryParam } from '../EventQueryParam';

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

  create(params: Event) {
    params.id = Math.max(...this.events.map((event) => event.id)) + 1;
    this.events.push(params);
    return params;
  }

  update(id: number, params: Event): Event {
    const index = this.events.findIndex((event) => event.id === id);
    if (index >= 0) {
      this.events[index].name = params.name;
      this.events[index].description = params.description;
      this.events[index].when = params.when;
      this.events[index].address = params.address;
      this.events[index].id =
        Math.max(...this.events.map((event) => event.id)) + 1;
    }
    return null;
  }

  updatePartial(id: number, params: Event): Event {
    const index = this.events.findIndex((event) => event.id === id);
    if (index >= 0) {
      if (params.name) {
        this.events[index].name = params.name;
      }
      if (params.description) {
        this.events[index].description = params.description;
      }
      if (params.when) {
        this.events[index].when = params.when;
      }
      if (params.address) {
        this.events[index].address = params.address;
      }
      return this.events[index];
    }
    return null;
  }

  destroy(id: number): boolean {
    const index = this.events.findIndex((event) => event.id === id);
    if (index >= 0) {
      this.events.splice(index, 1);
      return true;
    }
    return false;
  }
}
