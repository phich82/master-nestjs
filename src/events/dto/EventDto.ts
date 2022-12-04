export class EventDto {
  id?: number;
  name: string;
  description: string;
  when: string;
  address: string;

  constructor(
    name?: string,
    description?: string,
    when?: string,
    address?: string,
    id?: number,
  ) {
    this.name = name;
    this.description = description;
    this.when = when;
    this.address = address;
    this.id = id;
  }
}
