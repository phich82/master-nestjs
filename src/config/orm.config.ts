import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from '@modules/events/entities/event.entity';
import { Attendee } from '@/modules/events/entities/attendee.entity';
import { Profile } from '@/entities/profile.entity';
import { User } from '@/entities/user.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as 'mysql' | 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Event, Attendee, Profile, User],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
    // migrations: ["${rootDir}/src/database/migrations/**/*.{js,ts}"],
  }),
);
