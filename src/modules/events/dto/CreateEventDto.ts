import { IsString, Length } from "class-validator";

export class CreateEventDto {
  @IsString()
  @Length(1, null, { message: 'The name length id wrong' })
  name: string;
  @Length(0, 100)
  description: string;
  when: string;
  @Length(0, 255, { groups: ['create'] })
  @Length(10, 40, { groups: ['update'] })
  address: string;
}
