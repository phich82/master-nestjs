import { QueryParam } from 'src/shared';

export class EventQueryParam extends QueryParam {
  name?: string;
  description?: string;
  when?: Date;
  address?: string;
}
